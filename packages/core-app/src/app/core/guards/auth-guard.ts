import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../services/user.profile';

export const authGuard = () => {
  const userProfileService = inject(UserProfileService);
  const router = inject(Router);
  const currentUser = userProfileService.getCurrentUserProfileValue();

  if (currentUser) {
    router.navigate(['./list']);
    return false;
  }
  return true;
};
