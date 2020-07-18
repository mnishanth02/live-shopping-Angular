import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { UserProduct } from 'src/model/UserProduct';
import { UserService } from '../user.service';
import { base64toBlob } from 'src/app/owner/add-new-shop/add-new-shop.page';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.page.html',
  styleUrls: ['./add-new-product.page.scss'],
})
export class AddNewProductPage implements OnInit {
  form: FormGroup;
  product: UserProduct;
  shopId: string;
  constructor(
    private userService: UserService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {

    this.form = new FormGroup({
      productName: new FormControl(null, {
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
    const newProduct: UserProduct = {
      id: null,
      productName: this.form.value.productName,
      productImage: this.form.value.productImage,
    };
    console.log(newProduct);
    this.userService.addNewProduct(newProduct).subscribe(() => {
      console.log("incontroller");
      this.form.reset();
      this.navCtrl.navigateBack(`/user/tabs/products`);
      // this.router.navigate(["/owner/tabs/shops"]);
    });
  }

  goBack() {
    // this.storage.set("PAGE_FROM", "OWNER_ADD_NEW_PRODUCT");
    this.navCtrl.back();
  }

}
