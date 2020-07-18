import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserProduct } from 'src/model/UserProduct';
import { switchMap, take, tap, map } from 'rxjs/operators';


interface UserProductData {
  _id: string,
  productName: string,
  productImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.url;
  private _userProduct = new BehaviorSubject<UserProduct[]>([]);


  
  constructor(private http: HttpClient) {}

  get allUserProducts() {
    return this._userProduct.asObservable();
  }


  addNewProduct(product: UserProduct) {
    let formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("productImage", product.productImage as File);
    

    console.log(formData);

    let productNew: UserProduct;
    return this.http
      .post<UserProductData>(
        `${this.url}/api/user/addProduct`,
        formData
      )
      .pipe(
        switchMap((resData) => {
          console.log(resData);
          const newProduct = resData["newProduct"];
          productNew = new UserProduct(
            newProduct._id,
            newProduct.productName,
            newProduct.productImage
          );
          return this.allUserProducts;
        }),
        take(1),
        tap((products) => {
          this._userProduct.next(products.concat(productNew));
        })
      );
  }




  fetchAllUserProducts() {
    return this.http
      .get<UserProductData[]>(`${this.url}/api/user/allUserProducts`)
      .pipe(
        map((resList) => {
          let productsArr: UserProduct[] = [];
          resList.map((product) => {
            productsArr.push(
              new UserProduct(
                product._id,
                product.productName,
                product.productImage
              )
            );
          });

          return productsArr;
        }),
        tap((shops) => {
          this._userProduct.next(shops);
        })
      );
  }


  deleteShopProduct(id: string) {
    return this.http.delete(`${this.url}/api/user/userProduct/${id}`).pipe(
      switchMap(() => {
        return this.allUserProducts;
      }),
      take(1),
      tap((products) => {
        this._userProduct.next(products.filter((p) => p.id !== id));
      })
    );
  }


  
}
