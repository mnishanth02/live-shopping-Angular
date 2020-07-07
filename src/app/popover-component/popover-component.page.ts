import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { PopoverController } from '@ionic/angular';

@Component({
  selector: "app-popover-component",
  templateUrl: "./popover-component.page.html",
  styleUrls: ["./popover-component.page.scss"],
})
export class PopoverComponentPage implements OnInit {
  constructor(private authSerice: AuthService, private popover:PopoverController) {}

  ngOnInit() {}

  logout() {
    this.authSerice.logout();
    this.popover.dismiss();
  }
}
