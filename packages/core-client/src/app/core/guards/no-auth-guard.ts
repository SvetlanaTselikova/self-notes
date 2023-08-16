import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../services/user.profile';
import { LOGIN_PATH } from '@self-notes/utils';

export const noAuthGuard = () => {
  const userProfileService = inject(UserProfileService);
  const router = inject(Router);
  const currentUser = userProfileService.getCurrentUserProfileValue();

  if (!currentUser) {
    router.navigate([LOGIN_PATH], { queryParams: { redirect: router.url } });
    return false;
  }
  return true;
};
