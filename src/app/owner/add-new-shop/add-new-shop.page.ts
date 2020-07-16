import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OwnerService } from "../owner.service";
import { Router } from "@angular/router";
import { Shop } from "src/model/Shop";
import { ShopLocationI } from "src/model/Location.model";

export function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: "app-add-new-shop",
  templateUrl: "./add-new-shop.page.html",
  styleUrls: ["./add-new-shop.page.scss"],
})
export class AddNewShopPage implements OnInit {
  form: FormGroup;
  constructor(private ownerService: OwnerService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      shopName: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.email],
      }),
      shopType: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      location: new FormControl(null, {
        validators: [Validators.required],
      }),
      shopImage: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onAddShop() {
    if (!this.form.valid) {
      return;
    }

    const newShop: Shop = new Shop(
      null,
      this.form.value.shopName,
      this.form.value.email,
      this.form.value.shopType,
      this.form.value.shopImage,
      this.form.value.location
    );

    // this.ownerService.addNewShop(newShop);

    this.ownerService.addNewShop(newShop).subscribe(() => {
      this.form.reset();
      this.router.navigate(["/owner/tabs/shops"]);
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
    this.form.patchValue({ shopImage: imageFile });
  }

  onLocationPicked(location: ShopLocationI) {
    this.form.patchValue({ location: location });
  }
}
