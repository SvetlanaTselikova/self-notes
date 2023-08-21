import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap, catchError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Users } from '../../auth';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private userProfileSubject: BehaviorSubject<Users | null> =
    new BehaviorSubject<Users | null>(null);
  userProfile$: Observable<Users | null> =
    this.userProfileSubject.asObservable();

  constructor(private authService: AuthService) {}

  fetchUserProfile() {
    return this.authService.authenticationControllerWhoAmI().pipe(
      tap((user) => {
        this.userProfileSubject.next(user);
      }),
      catchError((err) => {
        this.userProfileSubject.next(null);
        return err;
      })
    );
  }

  getCurrentUserProfileValue() {
    return this.userProfileSubject.value;
  }

  resetUserProfile() {
    this.userProfileSubject.next(null);
  }

  setUserProfile(user: Users) {
    this.userProfileSubject.next(user);
  }
}
