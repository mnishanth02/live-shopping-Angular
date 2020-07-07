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
    let tokenPromise = this.authService.accesstoken();

    return from(tokenPromise).pipe(
      mergeMap((token) => {
        let authReq = req.clone({
          setHeaders: {
            Accept: "application/json",
            "Content-Type": "application/json",
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
