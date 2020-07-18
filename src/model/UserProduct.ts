export class UserProduct {
    constructor(
      public id: string,
      public productName: string,
      public productImage: string | File
    ) {}
  }
  