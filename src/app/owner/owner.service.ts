import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { switchMap, take, tap, map } from "rxjs/operators";
import { BehaviorSubject, of } from "rxjs";
import { Shop } from "src/model/Shop";
import { ShopProduct } from "../../model/ShopProduct";
import { ShopLocationI } from "../../model/Location.model";
import { DomSanitizer } from "@angular/platform-browser";

interface ShopData {
  _id: string;
  shopName: string;
  email: string;
  owner: string;
  shopImage: string;
  shopType: string;
  location: ShopLocationI;
}

interface ShopProductDate {
  _id: string;
  shopId: string;
  productName: string;
  productDesc: string;
  productKeyword: string[];
  price: number;
  available: number;
  units: string;
  productImage: string;
}

@Injectable({
  providedIn: "root",
})
export class OwnerService {
  url = environment.url;
  private _shops = new BehaviorSubject<Shop[]>([]);
  private _shopProducts = new BehaviorSubject<ShopProduct[]>([]);

  constructor(private http: HttpClient, private sanitization: DomSanitizer) {}

  get allShops() {
    return this._shops.asObservable();
  }

  get allShopProducts() {
    return this._shopProducts.asObservable();
  }

  // *************Shop*******************
  addNewShop(shop: Shop) {
    let formData = new FormData();
    formData.append("shopName", shop.shopName);
    formData.append("email", shop.email);
    formData.append("shopImage", shop.shopImage as File);
    formData.append("shopType", shop.shopType);
    formData.append("location", JSON.stringify(shop.location));
    console.log(formData);

    let newShop: Shop;
    return this.http.post(`${this.url}/api/shop/register`, formData).pipe(
      switchMap((resData) => {
        const newShopObj = resData["newShop"];
        newShop = new Shop(
          newShopObj["_id"],
          newShopObj["shopName"],
          newShopObj["email"],
          newShopObj["shopType"],
          newShopObj["shopImage"],
          newShopObj["location"]
        );
        return this.allShops;
      }),
      take(1),
      tap((shops) => {
        this._shops.next(shops.concat(newShop));
      })
    );
  }

  fetchShops() {
    return this.http.get<ShopData[]>(`${this.url}/api/shop/shops`).pipe(
      map((resList) => {
        const shopsArr: Shop[] = [];
        resList.map((shop) => {
          shopsArr.push(
            new Shop(
              shop._id,
              shop.shopName,
              shop.email,
              shop.shopType,
              shop.shopImage,
              shop.location
            )
          );
        });

        return shopsArr;
      }),
      tap((shops) => {
        this._shops.next(shops);
      })
    );
  }

  getShop(id: string) {
    return this.http.get<ShopData>(`${this.url}/api/shop/${id}`).pipe(
      map((shopData) => {
        return new Shop(
          shopData._id,
          shopData.shopName,
          shopData.email,
          shopData.shopType,
          shopData.shopImage,
          shopData.location
        );
      })
    );
  }

  editShop(shop: Shop) {
    let updatedShops: Shop[];
    return this.allShops.pipe(
      take(1),
      switchMap((shops) => {
        if (!shops || shops.length <= 0) {
          return this.fetchShops();
        } else {
          return of(shops);
        }
      }),
      switchMap((shopsList) => {
        const UpdatedShopIndex = shopsList.findIndex((sh) => sh.id === shop.id);
        updatedShops = [...shopsList];
        const oldShop = updatedShops[UpdatedShopIndex];
        updatedShops[UpdatedShopIndex] = {
          id: oldShop.id,
          shopName: oldShop.shopName,
          email: oldShop.email,
          shopType: oldShop.shopType,
          shopImage: oldShop.shopImage,
          location: oldShop.location,
        };
        return (
          this.http.put<ShopData>(`${this.url}/api/shop/edit/${shop.id}`, {
            ...updatedShops[UpdatedShopIndex],
          }),
          tap(() => {
            this._shops.next(updatedShops);
          })
        );
      })
    );
  }

  // *************Product*******************

  addNewProduct(product: ShopProduct) {
    let formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("productDesc", product.productDesc);
    formData.append("productKeyword", product.productKeyword.toString());
    formData.append("available", product.available.toString());
    formData.append("price", product.price.toString());
    formData.append("productImage", product.productImage as File);
    formData.append("shopId", product.shopId);

    console.log(formData);

    console.log(product);
    let productNew: ShopProduct;
    return this.http
      .post<ShopProductDate>(
        `${this.url}/api/shop/addProduct/${product.shopId}`,
        formData
      )
      .pipe(
        switchMap((resData) => {
          console.log(resData);
          const newProduct = resData["newProduct"];
          productNew = new ShopProduct(
            newProduct._id,
            newProduct.shopId,
            newProduct.productName,
            newProduct.productDesc,
            newProduct.productKeyword,
            newProduct.price,
            newProduct.available,
            newProduct.units,
            newProduct.productImage
          );
          return this.allShopProducts;
        }),
        take(1),
        tap((products) => {
          this._shopProducts.next(products.concat(productNew));
        })
      );
  }

  fetchShopProducts(shopId) {
    return this.http
      .get<ShopProductDate[]>(`${this.url}/api/shop/allProducts/${shopId}`)
      .pipe(
        map((resList) => {
          let productsArr: ShopProduct[] = [];
          resList.map((product) => {
            productsArr.push(
              new ShopProduct(
                product._id,
                product.shopId,
                product.productName,
                product.productDesc,
                product.productKeyword,
                product.price,
                product.available,
                product.units,
                product.productImage
              )
            );
          });

          return productsArr;
        }),
        tap((shops) => {
          this._shopProducts.next(shops);
        })
      );
  }

  getShopProduct(id: string) {
    return this.http
      .get<ShopProductDate>(`${this.url}/api/shop/product/${id}`)
      .pipe(
        map((shopData) => {
          return new ShopProduct(
            shopData._id,
            shopData.shopId,
            shopData.productName,
            shopData.productDesc,
            shopData.productKeyword,
            shopData.price,
            shopData.available,
            shopData.units,
            shopData.productImage
          );
        })
      );
  }

  deleteShopProduct(id: string) {
    return this.http.delete(`${this.url}/api/shop/product/${id}`).pipe(
      switchMap(() => {
        return this.allShopProducts;
      }),
      take(1),
      tap((products) => {
        this._shopProducts.next(products.filter((p) => p.id !== id));
      })
    );
  }
}
