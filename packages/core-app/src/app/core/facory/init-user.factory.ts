import { UserProfileService } from '../services/user.profile';

export function fetchUserProfile(userProfileService: UserProfileService) {
  return () => userProfileService.fetchUserProfile();
}
