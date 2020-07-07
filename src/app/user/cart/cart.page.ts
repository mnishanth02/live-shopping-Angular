import { Component, OnInit } from "@angular/core";
import { PopoverComponentPage } from "src/app/popover-component/popover-component.page";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit {
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
