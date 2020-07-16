import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { OwnerService } from "../owner.service";
import { NavController } from "@ionic/angular";
import { Shop } from "src/model/Shop";

@Component({
  selector: "app-edit-shop",
  templateUrl: "./edit-shop.page.html",
  styleUrls: ["./edit-shop.page.scss"],
})
export class EditShopPage implements OnInit, OnDestroy {
  shop: Shop;
  shopId: string;
  shopForm: FormGroup;
  private shopSubs: Subscription;

  constructor(
    private route: ActivatedRoute,
    private ownerService: OwnerService,
    private navCtrl: NavController,
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
            location: new FormControl(this.shop.location, {
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
            shopImgUrl: new FormControl(this.shop.shopImage, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
          });
        });
    });
  }

  ngOnDestroy() {
    if (this.shopSubs) {
      this.shopSubs.unsubscribe();
    }
  }
}
