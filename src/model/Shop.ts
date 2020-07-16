import { ShopLocationI } from ".././model/Location.model";
import { SafeUrl } from "@angular/platform-browser";

export class Shop {
  constructor(
    public id: string,
    public shopName: string,
    public email: string,
    public shopType: string,
    public shopImage: string | File,
    public location: ShopLocationI
  ) {}
}
