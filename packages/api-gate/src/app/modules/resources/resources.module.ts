import { Module } from '@nestjs/common';

import { Notes, Users } from '@self-notes-frontend/database';
import { NotesService } from './services';
import { NotesController } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notes, Users]), PermissionsModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class ResourcesModule {}
