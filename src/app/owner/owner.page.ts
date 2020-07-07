import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-owner",
  templateUrl: "./owner.page.html",
  styleUrls: ["./owner.page.scss"],
})
export class OwnerPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  onAddProduct(form: NgForm) {
  
    console.log(form);
  }
}
