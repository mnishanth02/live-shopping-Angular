import { Component, OnInit, ViewChild } from "@angular/core";
import { SegmentChangeEventDetail } from "@ionic/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { LoadingController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  // service

  onUserRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form);

    const fullName = form.value.fullName;
    const mobileNo = form.value.mobileNo;
    const email = form.value.email;
    const password = form.value.password;
    const role = form.value.role;

    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: "Registering...",
      })
      .then((loadEl) => {
        loadEl.present();

        this.authService
          .userRegister(fullName, mobileNo, email, password, role)
          .subscribe(
            () => {
              loadEl.dismiss();
              console.log("logg in success full");
              // this.router.navigateByUrl("/auth");
              this.authService.userLogin(email, password).subscribe();
            },
            (error) => {
              loadEl.dismiss();
              console.log(error);
            }
          );
      });
  }

  onOwnerRegister(form: NgForm) {
    console.log(form);
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Info",
      buttons: ["OK"],
    });
    alert.then((alert) => alert.present());
  }
}
