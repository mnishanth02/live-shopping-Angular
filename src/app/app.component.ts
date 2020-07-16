import { Component } from "@angular/core";
import { Plugins, Capacitor } from "@capacitor/core";
import { Platform } from "@ionic/angular";
import { AuthService, User } from "./auth/auth.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  user: User;
  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable("SplashScreen")) {
        Plugins.SplashScreen.hide();
      }
    });

    this.authService.authenticationState.subscribe((state) => {
      this.storage.get("user").then((user) => {
        this.user = {
          email: user?.email,
          fullName: user?.fullName,
          mobileNumber: user?.mobileNumber,
          role: user?.role,
        };

        if (state) {
          if (this.user.role === "user") {
            this.router.navigate(["user"]);
          } else if (this.user.role === "owner") {
            this.router.navigate(["owner"]);
          } else {
            this.router.navigate(["auth"]);
          }
        } else {
          this.router.navigate(["auth"]);
        }
      });
    });
  }
}
