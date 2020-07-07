import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { OwnerService } from "../owner.service";
import { NavController } from "@ionic/angular";
import { Shop } from 'src/model/Shop';

@Component({
  selector: "app-edit-shop",
  templateUrl: "./edit-shop.page.html",
  styleUrls: ["./edit-shop.page.scss"],
})
export class EditShopPage implements OnInit {
  shop: Shop;
  shopId: string;
  shopForm: FormGroup;
  private shopSubs: Subscription;

  constructor(
    private route: ActivatedRoute,
    private ownerService: OwnerService,
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("shopId")) {
        this.navCtrl.navigateBack("/owner/tabs/shops");
        return;
      }
      this.shopId = paramMap.get("shopId");

      this.shopSubs = this.ownerService
        .getShop(this.shopId)
        .subscribe((shop) => {
          this.shop = shop;

          this.shopForm = new FormGroup({
            shopName: new FormControl(this.shop.shopName, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
            address: new FormControl(this.shop.address, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
            email: new FormControl(this.shop.email, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
            shopType: new FormControl(this.shop.shopType, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
            shopImgUrl: new FormControl(this.shop.shopImgUrl, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
          });
        });
    });
  }
}
