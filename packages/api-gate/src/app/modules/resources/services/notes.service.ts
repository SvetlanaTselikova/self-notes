import { Injectable } from '@nestjs/common';

import { Notes } from '@self-notes/database';
import { DataSource } from 'typeorm';
import { ResourceService } from './resource.service';

@Injectable()
export class NotesService extends ResourceService<Notes> {
  constructor(protected dataSource: DataSource) {
    super(dataSource, Notes);
  }
}
