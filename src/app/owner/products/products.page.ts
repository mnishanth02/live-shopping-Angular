import { Component, OnInit } from "@angular/core";
import { PopoverComponentPage } from "src/app/popover-component/popover-component.page";
import { PopoverController, NavController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { OwnerService } from "../owner.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ShopProduct } from "src/model/ShopProduct";

@Component({
  selector: "app-products",
  templateUrl: "./products.page.html",
  styleUrls: ["./products.page.scss"],
})
export class ProductsPage implements OnInit {
  loadedProducts: ShopProduct[];
  private subs: Subscription;

  constructor(
    private ownerService: OwnerService,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private popover: PopoverController
  ) {}

  ngOnInit() {
    this.subs = this.ownerService.allShopProducts.subscribe((products) => {
      this.loadedProducts = products;
    });
  }

  ionViewWillEnter() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("shopId")) {
        this.navCtrl.navigateBack("/owner/tabs/shops");
        console.log("no data");
        return;
      }

      this.subs = this.ownerService
        .fetchShopProducts(paramMap.get("shopId"))
        .subscribe((products) => {
          console.log(products);
        });
    });
  }

  async createPopover(ev) {
    this.popover
      .create({
        component: PopoverComponentPage,
        showBackdrop: true,
        event: ev,
        animated: true,
        backdropDismiss: true,
        keyboardClose: true,
      })
      .then((popoverElement) => {
        popoverElement.present();
      });
  }

  deleteShopProduct() {
    
  }
}
