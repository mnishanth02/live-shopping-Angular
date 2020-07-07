export class ShopProduct {
  constructor(
    public id: string,
    public productName: string,
    public productDesc: string,
    public productKeyword: string[],
    public price: number,
    public available: number,
    public units: string
  ) {}
}
