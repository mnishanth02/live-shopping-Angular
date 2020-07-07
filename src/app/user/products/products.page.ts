import { Component, OnInit } from "@angular/core";
import { PopoverComponentPage } from "src/app/popover-component/popover-component.page";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-products",
  templateUrl: "./products.page.html",
  styleUrls: ["./products.page.scss"],
})
export class ProductsPage implements OnInit {
  constructor(private popover: PopoverController) {}

  ngOnInit() {}
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
}
