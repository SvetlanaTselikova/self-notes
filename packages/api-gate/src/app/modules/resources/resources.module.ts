import { Module } from '@nestjs/common';

import { Notes, Users } from '@self-notes-frontend/database';
import { NotesService, UsersService } from './services';
import { NotesController } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsModule } from '../permissions/permissions.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notes, Users]),
    PermissionsModule,
    AuthenticationModule,
  ],
  controllers: [NotesController, UsersController],
  providers: [NotesService, UsersService],
})
export class ResourcesModule {}
