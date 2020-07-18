import { Component, OnInit } from "@angular/core";
import { PopoverComponentPage } from "src/app/popover-component/popover-component.page";
import { PopoverController, NavController, IonItemSliding } from "@ionic/angular";
import { UserProduct } from 'src/model/UserProduct';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-products",
  templateUrl: "./products.page.html",
  styleUrls: ["./products.page.scss"],
})
export class ProductsPage implements OnInit {
  loadedProducts: UserProduct[];
  private subs: Subscription  ;

  constructor( private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private popover: PopoverController) {}



  ngOnInit() {

    this.subs = this.userService
        .allUserProducts
        .subscribe((products) => {
          this.loadedProducts = products;
        });
        this.userService.fetchAllUserProducts().subscribe();

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
