import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OwnerService } from "../owner.service";
import { ShopProduct } from "src/model/ShopProduct";

@Component({
  selector: "app-add-new-product",
  templateUrl: "./add-new-product.page.html",
  styleUrls: ["./add-new-product.page.scss"],
})
export class AddNewProductPage implements OnInit {
  form: FormGroup;
  product: ShopProduct;
  constructor(private ownerService: OwnerService) {}

  ngOnInit() {
    this.form = new FormGroup({
      productName: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      productDesc: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      productKeyword: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      price: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      available: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      units: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
    });
  }

  onAddProduct() {
    const newProduct: ShopProduct = {
      id: null,
      productName: this.form.value.productName,
      productDesc: this.form.value.productDesc,
      productKeyword: this.form.value.productKeyword.trim().split(","),
      available: this.form.value.available,
      price: this.form.value.price,
      units: this.form.value.units,
    };
    console.log(newProduct);
    this.ownerService.addNewProduct(newProduct);
  }
}
