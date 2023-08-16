import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { LOGIN_PATH } from '@self-notes-frontend/utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

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
              this.router.navigate([LOGIN_PATH]);
              return EMPTY;
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
