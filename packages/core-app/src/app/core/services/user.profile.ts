import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap, catchError, EMPTY } from 'rxjs';
import { API_URL } from '../constants/api';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private userProfileSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  userProfile$: Observable<any> = this.userProfileSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  fetchUserProfile() {
    return this.httpClient
      .get(`${API_URL}/whoami`, { withCredentials: true })
      .pipe(
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
