import { Injectable } from '@angular/core';
import {
  BaseQueryHandler,
  RefreshTokenQuery,
} from 'libs/clients-message-bus/src/lib/types';
import { BehaviorSubject, catchError, take, tap } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { LOGIN_PATH } from '@self-notes/utils';

@Injectable()
export class RefreshTokenHandler
  implements BaseQueryHandler<RefreshTokenQuery, void>
{
  constructor(private authService: AuthService, private router: Router) {}

  queryName: RefreshTokenQuery['name'] = 'refreshToken';

  execute(querySubject: BehaviorSubject<void>) {
    this.authService
      .authenticationControllerRefresh()
      .pipe(
        take(1),
        tap(() => querySubject.next()),
        catchError(() => this.router.navigate([LOGIN_PATH]))
      )
      .subscribe();
  }
}
