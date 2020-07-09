import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { switchMap, take, tap, map } from "rxjs/operators";
import { AlertController } from "@ionic/angular";
import { BehaviorSubject, of } from "rxjs";
import { Shop } from "src/model/Shop";
import { ShopProduct } from "src/model/ShopProduct";
import { ShopLocation } from "src/model/Location.model";

interface ShopData {
  address: string;
  email: string;
  owner: string;
  shopImgUrl: string;
  shopName: string;
  shopType: string;
  _id: string;
  shopLocation: ShopLocation;
}

interface ShopProductDate {
  _id: string;
  productName: string;
  productDesc: string;
  productKeyword: string[];
  price: number;
  available: number;
  units: string;
}

@Injectable({
  providedIn: "root",
})
export class OwnerService {
  url = environment.url;
  private _shops = new BehaviorSubject<Shop[]>([]);
  private _shopProducts = new BehaviorSubject<ShopProduct[]>([]);

  constructor(
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  get allShops() {
    return this._shops.asObservable();
  }

  get allShopProducts() {
    return this._shopProducts.asObservable();
  }

  // *************Shop*******************
  addNewShop(shop: Shop) {
    console.log(shop);
    let generatedShopId;
    return this.http.post(`${this.url}/api/shop/register`, shop).pipe(
      switchMap((resData) => {
        generatedShopId = resData["_id"];
        return this.allShops;
      }),
      take(1),
      tap((shops) => {
        shop.id = generatedShopId;
        this._shops.next(shops.concat(shop));
      })
      // catchError((e) => {
      //   this.showAlert(e.error);
      //   throw new Error(e);
      // })
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
              shop.address,
              shop.shopType,
              shop.shopImgUrl,
              shop.shopLocation
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
          shopData.address,
          shopData.shopType,
          shopData.shopImgUrl,
          shopData.shopLocation
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
          address: oldShop.address,
          shopType: oldShop.shopType,
          shopImgUrl: oldShop.shopImgUrl,
          shopLocation: oldShop.shopLocation,
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
    // need to send Shop Id
    console.log(product);
    let generatedProductId;
    return this.http
      .post<ShopProductDate>(`${this.url}/api/shop/addProduct`, product.id)
      .pipe(
        switchMap((resData) => {
          generatedProductId = resData._id;
          return this.allShopProducts;
        }),
        take(1),
        tap((products) => {
          product.id = generatedProductId;
          this._shopProducts.next(products.concat(product));
        })
      );
  }

  fetchShopProducts(shopId) {
    return this.http
      .get<ShopProductDate[]>(`${this.url}/api/shop/allProducts/${shopId}`)
      .pipe(
        map((resList) => {
          const productsArr: ShopProduct[] = [];
          resList.map((product) => {
            productsArr.push(
              new ShopProduct(
                product._id,
                product.productName,
                product.productDesc,
                product.productKeyword,
                product.price,
                product.available,
                product.units
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
            shopData.productName,
            shopData.productDesc,
            shopData.productKeyword,
            shopData.price,
            shopData.available,
            shopData.units
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
