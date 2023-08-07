import { Component, OnInit } from '@angular/core';
import {
  GoogleLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { EMPTY, from, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'packages/core-app/src/app/core/constants/api';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.sass'],
})
export class GoogleLoginComponent implements OnInit {
  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private httpClient: HttpClient
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
                this.httpClient.post(
                  `${API_URL}/google-authenticate`,
                  {
                    token: accessToken,
                  },
                  { withCredentials: true }
                )
              )
            );
          } else return EMPTY;
        }),
        switchMap(() => from(this.router.navigate(['/list'])))
      )
      .subscribe();
  }
}
