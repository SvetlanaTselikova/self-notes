import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, EMPTY, catchError, map, take, tap } from 'rxjs';
import { UserProfileService } from '../../core/services/user.profile';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

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

  logoutInProgress$ = new BehaviorSubject<boolean>(false);
  logoutError$ = new BehaviorSubject<boolean>(false);

  userProfile$ = this.userProfileService.userProfile$;

  isSmallScreen$ = this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .pipe(map((result) => result.matches));

  logout() {
    this.logoutInProgress$.next(true);
    this.logoutError$.next(false);

    this.authService
      .authenticationControllerLogOut()
      .pipe(
        take(1),
        tap(() => {
          this.logoutInProgress$.next(false);
          this.router.navigate(['/login']);
        }),
        catchError(() => {
          this.logoutInProgress$.next(false);
          this.logoutError$.next(true);

          return EMPTY;
        })
      )
      .subscribe();
  }

  ngOnInit() {}
}
