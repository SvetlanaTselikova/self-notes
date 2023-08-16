import {
  MongoAbility,
  ExtractSubjectType,
  AbilityBuilder,
  createMongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Notes, Users } from '@self-notes/database';
import { Action, Subjects } from '../types';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: Users) {
    const { can, build } = new AbilityBuilder<MongoAbility<[Action, Subjects]>>(
      createMongoAbility
    );

    Object.values(Action).forEach((action) => {
      can(action, Notes);
    });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
