import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {
  AuthenticationService,
  GoogleAuthenticationService,
  JwtRefreshTokenStrategy,
  JwtStrategy,
  UsersService,
} from './services';
import { JwtAuthenticationGuard, JwtRefreshGuard } from './guards';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@self-notes/database';
import { AuthenticationController } from './controllers/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME'
          )}s`,
        },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    GoogleAuthenticationService,
    JwtRefreshTokenStrategy,
    JwtStrategy,
    UsersService,
    JwtAuthenticationGuard,
    JwtRefreshGuard,
  ],
  exports: [JwtAuthenticationGuard, JwtRefreshGuard],
})
export class AuthenticationModule {}
