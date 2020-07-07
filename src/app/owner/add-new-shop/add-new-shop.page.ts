import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OwnerService } from "../owner.service";
import { Router } from "@angular/router";
import { Shop } from "src/model/Shop";

// export interface Shop {
//   id: string;
//   shopName: string;
//   email: string;
//   address: string;
//   shopType: string;
//   shopImgUrl: string;
// }
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
      address: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      shopType: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      shopImgUrl: new FormControl(null, {
        updateOn: "blur",
        // validators: [Validators.required],
      }),
    });
  }

  onAddShop() {
    const newShop: Shop = new Shop(
      null,
      this.form.value.shopName,
      this.form.value.email,
      this.form.value.address,
      this.form.value.shopType,
      this.form.value.shopImgUrl
    );

    // const newShop: Shop = {
    //   id: null,
    //   shopName: this.form.value.shopName,
    //   email: this.form.value.email,
    //   address: this.form.value.address,
    //   shopType: this.form.value.shopType,
    //   shopImgUrl: this.form.value.shopImgUrl,
    // };
    // console.log(newShop);
    this.ownerService.addNewShop(newShop).subscribe(() => {
      this.form.reset();
      this.router.navigate(["/owner/tabs/shops"]);
    });
  }
}
