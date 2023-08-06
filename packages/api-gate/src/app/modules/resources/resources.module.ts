import { Module } from '@nestjs/common';

import { Notes, Users } from '@self-notes-frontend/database';
import { NotesService } from './services';
import { NotesController } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Notes, Users])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class ResourcesModule {}
