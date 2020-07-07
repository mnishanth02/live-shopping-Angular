import { Component, OnInit } from "@angular/core";

import { AuthService } from "./auth.service";
import { NgForm } from "@angular/forms";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: "Logging In...",
      })
      .then((loadEl) => {
        loadEl.present();
        this.authService
          .userLogin(form.value.email, form.value.password)
          .subscribe(
            () => {
              loadEl.dismiss();
              console.log("logg in success full");
            },
            (error) => {
              loadEl.dismiss();
              console.log(error);
            }
          );
      });
  }
}
