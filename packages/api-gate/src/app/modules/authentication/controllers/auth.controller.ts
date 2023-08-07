import {
  Controller,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
  Req,
  UseGuards,
  Res,
  Get,
  HttpCode,
} from '@nestjs/common';
import { TokenVerificationDto } from '../dto';
import { GoogleAuthenticationService, UsersService } from '../services';
import { Request, Response } from 'express';
import { JwtAuthenticationGuard, JwtRefreshGuard } from '../guards';
import { AuthenticationService } from '../services/auth.service';
import RequestWithUser from '../types';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private googleAuthenticationService: GoogleAuthenticationService,
    private authService: AuthenticationService,
    private usersService: UsersService
  ) {}

  @Post('google-authenticate')
  async authenticate(
    @Body() tokenData: TokenVerificationDto,
    @Req() request: Request
  ) {
    const { accessTokenCookie, refreshTokenCookie, user } =
      await this.googleAuthenticationService.authenticate(tokenData.token);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);

    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      request.user.id
    );

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
