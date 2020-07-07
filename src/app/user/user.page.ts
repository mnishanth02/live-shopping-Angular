import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { PopoverComponentPage } from "../popover-component/popover-component.page";

@Component({
  selector: "app-user",
  templateUrl: "./user.page.html",
  styleUrls: ["./user.page.scss"],
})
export class UserPage implements OnInit {
  // userpop = null;
  constructor(private popover: PopoverController) {}
  ngOnInit() {}

 

  // dismissPopover() {
  //   if (this.userpop) {
  //     this.userpop.dismiss().then(() => {
  //       this.userpop = null;
  //     });
  //   }
  // }
}
