import { Component, OnInit } from "@angular/core";
import { PopoverController, NavController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { OwnerService } from "../owner.service";

@Component({
  selector: "app-all-products",
  templateUrl: "./all-products.page.html",
  styleUrls: ["./all-products.page.scss"],
})
export class AllProductsPage implements OnInit {
  constructor(
    private ownerService: OwnerService,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private popover: PopoverController
  ) {}

  ngOnInit() {
    console.log("ngOnInit");
    this.navCtrl.back()
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
  }
}
