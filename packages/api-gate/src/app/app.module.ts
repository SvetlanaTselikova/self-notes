import { Module } from '@nestjs/common';
import { ResourcesModule } from './modules';
import { DatabaseModule } from '@self-notes-frontend/database';

@Module({
  imports: [DatabaseModule, ResourcesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
