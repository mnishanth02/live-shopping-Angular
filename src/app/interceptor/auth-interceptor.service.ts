import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError, from } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { AlertController } from "@ionic/angular";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get("skip")) {
      let newClone = req.clone({
        headers: req.headers.delete("skip"),
      });
      return next.handle(newClone);
    }
    let tokenPromise = this.authService.accesstoken();
    // "Content-Type": "application/json",

    return from(tokenPromise).pipe(
      mergeMap((token) => {
        let authReq = req.clone({
          setHeaders: {
            Accept: "application/json",
            enctype: "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        return next.handle(authReq).pipe(
          catchError((error) => {
            this.alertCtrl
              .create({
                header: error.name,
                message: error.message,
                buttons: ["OK"],
              })
              .then((alertEle) => {
                alertEle.present();
              });
            return throwError(error);
          })
        );
      })
    );
  }
}
