import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OwnerService } from "../owner.service";
import { ShopProduct } from "src/model/ShopProduct";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { base64toBlob } from "../add-new-shop/add-new-shop.page";

@Component({
  selector: "app-add-new-product",
  templateUrl: "./add-new-product.page.html",
  styleUrls: ["./add-new-product.page.scss"],
})
export class AddNewProductPage implements OnInit {
  form: FormGroup;
  product: ShopProduct;
  shopId: string;
  constructor(
    private ownerService: OwnerService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("shopId")) {
        this.navCtrl.navigateBack("/owner/tabs/shops");
        console.log("No Products in this Shop");
        return;
      }
      this.shopId = paramMap.get("shopId");
    });

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
      productImage: new FormControl(null),
    });
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === "string") {
      try {
        console.log(imageData);
        let imageType;
        if (imageData.includes("data:image/png;base64")) {
          imageType = "data:image/png;base64,";
        } else if (imageData.includes("data:image/jpg;base64")) {
          imageType = "data:image/jpg;base64,";
        } else if (imageData.includes("data:image/jpeg;base64")) {
          imageType = "data:image/jpeg;base64,";
        }
        imageFile = base64toBlob(
          imageData.replace(imageType, ""),
          "image/jpeg"
        );
      } catch (error) {
        console.log("this image cannot be used", error);
      }
    } else {
      imageFile = imageData;
    }
    this.form.patchValue({ productImage: imageFile });
  }

  onAddProduct() {
    const newProduct: ShopProduct = {
      id: null,
      shopId: this.shopId,
      productName: this.form.value.productName,
      productDesc: this.form.value.productDesc,
      productKeyword: this.form.value.productKeyword.trim().split(","),
      available: this.form.value.available,
      price: this.form.value.price,
      units: this.form.value.units,
      productImage: this.form.value.productImage,
    };
    console.log(newProduct);
    this.ownerService.addNewProduct(newProduct).subscribe(() => {
      console.log("incontroller");
      this.form.reset();
      this.navCtrl.navigateBack(`/owner/tabs/shops/products/${this.shopId}`);
      // this.router.navigate(["/owner/tabs/shops"]);
    });
  }

  goBack() {
    // this.storage.set("PAGE_FROM", "OWNER_ADD_NEW_PRODUCT");
    this.navCtrl.back();
  }
}
