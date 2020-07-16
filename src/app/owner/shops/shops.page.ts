import { Component, OnInit, OnDestroy } from "@angular/core";
import { PopoverComponentPage } from "src/app/popover-component/popover-component.page";
import { PopoverController, IonItemSliding } from "@ionic/angular";
import { OwnerService } from "../owner.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { Shop } from "src/model/Shop";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-shops",
  templateUrl: "./shops.page.html",
  styleUrls: ["./shops.page.scss"],
})
export class ShopsPage implements OnInit, OnDestroy {
  loadedShops: Shop[];
  private subs: Subscription;

  constructor(
    private popover: PopoverController,
    private ownerService: OwnerService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subs = this.ownerService.allShops.subscribe((shops) => {
      this.loadedShops = shops;
      console.log(this.loadedShops);
    });
    this.ownerService.fetchShops().subscribe();
  }

  ionViewWillEnter() {
    
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

  onEdit(shopId: string, slidingItem: IonItemSliding) {
    this.router.navigate(["/", "owner", "tabs", "shops", "edit", shopId]);
    slidingItem.close();
  }

  onViewShop(shopId: string, slidingItem: IonItemSliding) {
    this.router.navigate(["/", "owner", "tabs", "shops", shopId]);
    slidingItem.close();
  }


  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
