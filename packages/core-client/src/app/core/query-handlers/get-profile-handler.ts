import { Injectable } from '@angular/core';
import {
  BaseQueryHandler,
  ProfileQuery,
} from 'libs/clients-message-bus/src/lib/types';
import { UserProfileService } from '../services';
import { Users } from '../../auth';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProfileQueryHandler
  implements BaseQueryHandler<ProfileQuery, Users>
{
  constructor(private userProfileService: UserProfileService) {}

  queryName: ProfileQuery['name'] = 'getProfile';

  execute(querySubject: BehaviorSubject<Users>) {
    const currentProfile =
      this.userProfileService.getCurrentUserProfileValue() as Users;
    querySubject.next(currentProfile);
  }
}
