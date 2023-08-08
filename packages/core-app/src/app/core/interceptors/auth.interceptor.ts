import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { API_URL } from '../constants/api';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private httpClient: HttpClient, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes('refresh')) {
          return this.httpClient
            .get(`${API_URL}/refresh`, { withCredentials: true })
            .pipe(
              switchMap(() => {
                const clonedRequest = request.clone();
                return next.handle(clonedRequest);
              }),
              catchError((refreshError: any) => {
                this.router.navigate(['/login']);
                return EMPTY;
              })
            );
        }
        return throwError(error);
      })
    );
  }
}
