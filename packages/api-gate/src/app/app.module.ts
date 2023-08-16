import { Module } from '@nestjs/common';
import { ResourcesModule } from './modules';
import { DatabaseModule } from '@self-notes/database';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [DatabaseModule, ResourcesModule, LoggerModule.forRoot({})],
  controllers: [],
  providers: [],
})
export class AppModule {}
