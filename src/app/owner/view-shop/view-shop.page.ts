import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { NavController, ModalController } from "@ionic/angular";
import { OwnerService } from "../owner.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Shop } from "../../../model/Shop";
import { MapModalComponent } from "../../shared/map-modal/map-modal.component";

@Component({
  selector: "app-view-shop",
  templateUrl: "./view-shop.page.html",
  styleUrls: ["./view-shop.page.scss"],
})
export class ViewShopPage implements OnInit {
  loadedShop: Shop;
  private subs: Subscription;

  constructor(
    private ownerService: OwnerService,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  onShowFullmap() {
    this.modalCtrl
      .create({
        component: MapModalComponent,
        componentProps: {
          center: {
            lat: this.loadedShop.shopLocation.lat,
            lng: this.loadedShop.shopLocation.lng,
          },
          selectable: false,
          closeButtonText: "Close",
          title: this.loadedShop.shopLocation.address,
        },
      })
      .then((modalEle) => {
        modalEle.present();
      });
  }
}
