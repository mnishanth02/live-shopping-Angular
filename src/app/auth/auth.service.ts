import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Platform, AlertController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Storage } from "@ionic/storage";
import { environment } from "../../environments/environment";
import { tap, catchError } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

const TOKEN_KEY = "access_token";
const USER = "user";

export interface User {
  email: string;
  fullName: string;
  mobileNumber: number;
  role: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url = environment.url;
  private _user: User = null;
  authenticationState = new BehaviorSubject(false);
  // userSubject = new Subject<{ user: User }>();

  get user() {
    return this._user;
  }
  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then((token) => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.storage.get(USER).then((user) => {
            this._user = {
              email: user.email,
              fullName: user.fullName,
              mobileNumber: user.mobileNumber,
              role: user.role,
            };
          });
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
          this.storage.remove(USER);
          this.authenticationState.next(false);
          this._user = null;
        }
      }
    });
  }

  // switched = of(1, 2, 3).pipe(switchMap((x: number) => of(x, x ** 2, x ** 3)));

  userRegister(name, mobile, email, password, role): Observable<any> {
    const credentials = {
      fullName: name,
      mobileNumber: mobile,
      email,
      password,
      role,
    };
    return this.http.post(`${this.url}/api/user/register`, credentials).pipe(
      catchError((e) => {
        throw new Error(e);
      })
    );
  }

  userLogin(email, password) {
    const credentials = {
      email,
      password,
    };

    return this.http.post(`${this.url}/api/user/login`, credentials).pipe(
      tap((res) => {
        this.storage.set(TOKEN_KEY, res["token"]);
        this.storage.set(USER, res["user"]);
        const userTemp = res["user"];
        this._user = {
          email: userTemp.email,
          fullName: userTemp.fullName,
          mobileNumber: userTemp.mobileNumber,
          role: userTemp.role,
        };

        // this.user = this.helper.decodeToken(res["token"]);
        console.log("user Decoded from Token : " + this.user);
        this.authenticationState.next(true);
      }),
      catchError((e) => {
        throw new Error(e);
      })
    );
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.storage.remove(USER);
      this._user = null;
      this.authenticationState.next(false);
    });
  }

  async accesstoken() {
    return await this.storage.get(TOKEN_KEY);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
