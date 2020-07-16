import { Component, OnInit, OnDestroy } from "@angular/core";
import { PopoverComponentPage } from "src/app/popover-component/popover-component.page";
import {
  PopoverController,
  NavController,
  IonItemSliding,
} from "@ionic/angular";
import { Subscription } from "rxjs";
import { OwnerService } from "../owner.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ShopProduct } from "src/model/ShopProduct";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-products",
  templateUrl: "./products.page.html",
  styleUrls: ["./products.page.scss"],
})
export class ProductsPage implements OnInit, OnDestroy {
  loadedProducts: ShopProduct[];
  private subs: Subscription;
  currentShopId: string;

  fromPage: string;
  constructor(
    private ownerService: OwnerService,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private popover: PopoverController
  ) {}

  ngOnInit() {
    console.log("ngONinit");
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("shopId")) {
        this.navCtrl.navigateBack("/owner/tabs/shops");
        console.log("No Products in this Shop");
        return;
      }
      this.currentShopId = paramMap.get("shopId");
      this.subs = this.ownerService
        .fetchShopProducts(this.currentShopId)
        .subscribe((products) => {
          this.loadedProducts = products;
        });
      // this.storage.get("PAGE_FROM").then((val) => {
      //   this.storage.remove("PAGE_FROM");
      //   this.fromPage = val;
      //   console.log(val);

      //   if (!val?.match("OWNER_ADD_NEW_PRODUCT")) {
      //     this.subs = this.ownerService
      //       .fetchShopProducts(this.currentShopId)
      //       .subscribe((products) => {
      //         console.log(products);
      //         this.loadedProducts = products;
      //       });
      //   }
      // });
    });
  }

  // ionViewWillEnter() {
  //   console.log("ionViewWillEnter");
  // }

  // ionViewDidEnter() {
  //   console.log("ionViewDidLoad");
  //   this.subs = this.ownerService
  //     .fetchShopProducts(this.currentShopId)
  //     .subscribe((products) => {
  //       this.loadedProducts = products;
  //     });
  // }

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

  deleteShopProduct() {}

  onEdit(productId: string, slidingItem: IonItemSliding) {
    this.router.navigate(["/", "owner", "tabs", "products", "edit", productId]);
    slidingItem.close();
  }

  onViewShop(productId: string, slidingItem: IonItemSliding) {
    this.router.navigate(["/", "owner", "tabs", "products", productId]);
    slidingItem.close();
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
