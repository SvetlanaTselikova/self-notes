import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap, catchError, EMPTY } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private userProfileSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  userProfile$: Observable<any> = this.userProfileSubject.asObservable();

  constructor(private authService: AuthService) {}

  fetchUserProfile() {
    return this.authService.authenticationControllerWhoAmI().pipe(
      tap((user) => {
        this.userProfileSubject.next(user);
      }),
      catchError(() => {
        this.userProfileSubject.next(null);
        return EMPTY;
      })
    );
  }

  getCurrentUserProfileValue(): any {
    return this.userProfileSubject.value;
  }
}
