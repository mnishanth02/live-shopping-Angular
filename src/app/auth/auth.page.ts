import { Component, OnInit } from "@angular/core";

import { AuthService } from "./auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.authService.userLogin(form.value.email, form.value.password).subscribe(
      () => {
        console.log("logg in success full");
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
