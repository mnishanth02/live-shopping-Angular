import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { NavController } from "@ionic/angular";
import { OwnerService } from "../owner.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ShopProduct } from "src/model/ShopProduct";

@Component({
  selector: "app-view-shop",
  templateUrl: "./view-shop.page.html",
  styleUrls: ["./view-shop.page.scss"],
})
export class ViewShopPage implements OnInit {
  loadedProducts: ShopProduct[];
  private subs: Subscription;

  constructor(
    private ownerService: OwnerService,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}
}
