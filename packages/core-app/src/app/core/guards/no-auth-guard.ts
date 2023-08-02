import { inject } from '@angular/core';
import { catchError, map, of, filter, take } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const noAuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedin.pipe(
    filter((value) => value !== null),
    map((isLoggedin) => {
      console.log(isLoggedin);
      if (isLoggedin) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError((error) => {
      return of(false);
    })
  );
};
