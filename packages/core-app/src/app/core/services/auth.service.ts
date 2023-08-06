import { Injectable } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { BehaviorSubject, ReplaySubject, from, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

const USER_INFO_KEY = 'USER_INFO_KEY';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  socialUser: any = new ReplaySubject();
  isLoggedin: any = new BehaviorSubject(null);

  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {
    this.initUserInfo();
    this.subscribeAuthState();
  }

  subscribeAuthState() {
    this.socialAuthService.authState
      .pipe(
        tap((user) => {
          if (user) {
            window.sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
            console.log(user);

            this.socialUser.next(user);
            this.isLoggedin.next(user != null);
          }
        }),
        switchMap(() => from(this.router.navigate(['/list'])))
      )
      .subscribe();
  }

  clearUserInfo() {
    window.sessionStorage.removeItem(USER_INFO_KEY);
  }

  initUserInfo() {
    const userInfo = window.sessionStorage.getItem(USER_INFO_KEY);
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      if (this.isTokenValid(parsedUserInfo.idToken)) {
        this.socialUser.next(parsedUserInfo);
        this.isLoggedin.next(true);
        return;
      }
    }
    this.clearUserInfo();
    this.isLoggedin.next(false);
    this.socialUser.next(null);
  }

  isTokenValid(token: string) {
    if (!token) {
      return false;
    }

    const tokenData = this.parseJwt(token);

    return Date.now() < tokenData.exp * 1000;
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
}
