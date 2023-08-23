import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { LOGIN_PATH } from '@self-notes/utils';
import { NotificationService } from '../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes('refresh')) {
          return this.authService.authenticationControllerRefresh().pipe(
            switchMap(() => {
              const clonedRequest = request.clone();
              return next.handle(clonedRequest);
            }),
            catchError(() => {
              const queryParams = [LOGIN_PATH, '/'].includes(this.router.url)
                ? {}
                : { redirect: this.router.url };
              this.router.navigate([LOGIN_PATH], {
                queryParams,
              });
              return EMPTY;
            })
          );
        }

        if (!request.url.includes('refresh')) {
          this.notificationService.showErrorNotification(error?.message);
        }

        return EMPTY;
      })
    );
  }
}
