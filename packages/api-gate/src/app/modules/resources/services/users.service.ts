import { Injectable } from '@nestjs/common';

import { Users } from '@self-notes-frontend/database';
import { DataSource } from 'typeorm';
import { ResourceService } from './resource.service';

@Injectable()
export class UsersService extends ResourceService<Users> {
  constructor(protected dataSource: DataSource) {
    super(dataSource, Users);
  }
}
