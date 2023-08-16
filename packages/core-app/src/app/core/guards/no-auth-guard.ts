import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../services/user.profile';
import { LOGIN_PATH } from '@self-notes-frontend/utils';

export const noAuthGuard = () => {
  const userProfileService = inject(UserProfileService);
  const router = inject(Router);
  const currentUser = userProfileService.getCurrentUserProfileValue();

  if (!currentUser) {
    router.navigate([LOGIN_PATH]);
    return false;
  }
  return true;
};
