import { Component, OnInit } from "@angular/core";
import { PopoverController, NavController, IonItemSliding } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { OwnerService } from "../owner.service";
import { ShopProduct } from 'src/model/ShopProduct';
import { Subscription } from 'rxjs';
import { PopoverComponentPage } from 'src/app/popover-component/popover-component.page';

@Component({
  selector: "app-all-products",
  templateUrl: "./all-products.page.html",
  styleUrls: ["./all-products.page.scss"],
})
export class AllProductsPage implements OnInit {
  allProducts: ShopProduct[];
  private subs: Subscription;

  constructor(
    private popover: PopoverController,
    private ownerService: OwnerService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subs = this.ownerService.allProducts.subscribe((products) => {
      this.allProducts = products;
      console.log(this.allProducts);
    });
    this.ownerService.fetchAllProducts().subscribe();
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
