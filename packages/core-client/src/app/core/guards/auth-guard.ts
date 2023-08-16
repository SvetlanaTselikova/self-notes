import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../services/user.profile';
import { NOTES_LIST_PATH } from '@self-notes/utils';

export const authGuard = () => {
  const userProfileService = inject(UserProfileService);
  const router = inject(Router);
  const currentUser = userProfileService.getCurrentUserProfileValue();

  if (currentUser) {
    router.navigate([NOTES_LIST_PATH]);
    return false;
  }
  return true;
};
