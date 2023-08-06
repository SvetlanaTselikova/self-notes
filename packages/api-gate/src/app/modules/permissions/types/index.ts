import { MongoAbility, InferSubjects } from '@casl/ability';
import { Notes } from '@self-notes-frontend/database';

export enum Action {
  Post = 'POST',
  Patch = 'PATCH',
  Get = 'GET',
  Delete = 'DELETE',
}

export type Subjects = InferSubjects<typeof Notes> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;
