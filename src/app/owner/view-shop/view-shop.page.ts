import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { NavController, ModalController } from "@ionic/angular";
import { OwnerService } from "../owner.service";
import { ActivatedRoute } from "@angular/router";
import { Shop } from "../../../model/Shop";
import { MapModalComponent } from "../../shared/map-modal/map-modal.component";

@Component({
  selector: "app-view-shop",
  templateUrl: "./view-shop.page.html",
  styleUrls: ["./view-shop.page.scss"],
})
export class ViewShopPage implements OnInit, OnDestroy {
  loadedShop: Shop;
  shopId: string;
  private shopSubs: Subscription;

  constructor(
    private ownerService: OwnerService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController
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
          this.loadedShop = shop;
        });
    });
  }

  onShowFullmap() {
    this.modalCtrl
      .create({
        component: MapModalComponent,
        componentProps: {
          center: {
            lat: this.loadedShop.location.lat,
            lng: this.loadedShop.location.lng,
          },
          selectable: false,
          closeButtonText: "Close",
          title: this.loadedShop.location.address,
        },
      })
      .then((modalEle) => {
        modalEle.present();
      });
  }
  ngOnDestroy() {
    if (this.shopSubs) {
      this.shopSubs.unsubscribe();
    }
  }
}
