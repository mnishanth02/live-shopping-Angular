import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { AlertController, LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingCtrl.getTop().then((hasLoading) => {
      if (!hasLoading) {
        this.loadingCtrl
          .create({
            spinner: "circular",
            translucent: true,
            showBackdrop: true,
          })
          .then((loading) => {
            loading.present();
          });
      }
    });

    return next.handle(req).pipe(
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
      }),
      finalize(() => {
        this.loadingCtrl.getTop().then((hasLoading) => {
          if (hasLoading) {
            this.loadingCtrl.dismiss();
          }
        });
      })
    );
  }
}
