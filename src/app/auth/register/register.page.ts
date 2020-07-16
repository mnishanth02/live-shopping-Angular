import { Component, OnInit } from "@angular/core";
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

    this.authService
      .userRegister(fullName, mobileNo, email, password, role)
      .subscribe(
        () => {
          console.log("registered in success full");
          this.authService.userLogin(email, password).subscribe();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onOwnerRegister(form: NgForm) {
    console.log(form);
  }
}
