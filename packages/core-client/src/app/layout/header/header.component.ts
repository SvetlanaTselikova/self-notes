import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, catchError, map, take, tap } from 'rxjs';
import { UserProfileService } from '../../core/services/user.profile';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import {
  LOGIN_PATH,
  NOTES_CREATE_PATH,
  NOTES_LIST_PATH,
} from '@self-notes/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public breakpointObserver: BreakpointObserver,
    protected userProfileService: UserProfileService,
    protected authService: AuthService,
    protected router: Router
  ) {}

  listPath = NOTES_LIST_PATH;
  createPath = NOTES_CREATE_PATH;

  logoutInProgress$ = new BehaviorSubject<boolean>(false);

  userProfile$ = this.userProfileService.userProfile$;

  isSmallScreen$ = this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .pipe(map((result) => result.matches));

  logout() {
    this.logoutInProgress$.next(true);

    this.authService
      .authenticationControllerLogOut()
      .pipe(
        take(1),
        tap(() => {
          this.logoutInProgress$.next(false);
          this.userProfileService.resetUserProfile();
          this.router.navigate([LOGIN_PATH], {
            queryParams: { redirect: this.router.url },
          });
        }),
        catchError((err) => {
          this.logoutInProgress$.next(false);

          return err;
        })
      )
      .subscribe();
  }

  ngOnInit() {}
}
