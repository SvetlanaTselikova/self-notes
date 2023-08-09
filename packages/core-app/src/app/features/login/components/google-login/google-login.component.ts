import { Component, OnInit } from '@angular/core';
import {
  GoogleLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { EMPTY, from, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'packages/core-app/src/app/auth/services/auth.service';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.sass'],
})
export class GoogleLoginComponent implements OnInit {
  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.subscribeAuthState();
  }

  subscribeAuthState() {
    this.socialAuthService.authState
      .pipe(
        switchMap((user) => {
          if (user) {
            return from(
              this.socialAuthService.getAccessToken(
                GoogleLoginProvider.PROVIDER_ID
              )
            ).pipe(
              switchMap((accessToken) =>
                this.authService.authenticationControllerAuthenticate({
                  token: accessToken,
                })
              )
            );
          } else return EMPTY;
        }),
        switchMap(() => from(this.router.navigate([this.getRedirectPath()])))
      )
      .subscribe();
  }

  getRedirectPath() {
    const urlTree = this.router.parseUrl(this.router.url);
    const queryParams = urlTree.queryParams;
    return queryParams?.['redirect'] || '/list';
  }
}
