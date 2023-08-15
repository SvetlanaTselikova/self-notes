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
import {
  ApiHeader,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Users } from '@self-notes-frontend/database';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private googleAuthenticationService: GoogleAuthenticationService,
    private authService: AuthenticationService,
    private usersService: UsersService
  ) {}

  @Post('google-authenticate')
  @ApiResponse({
    status: 200,
    type: Users,
  })
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
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  @ApiResponse({
    status: 200,
    type: Users,
  })
  @ApiUnauthorizedResponse()
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      request.user.id
    );

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('check-auth')
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(200)
  async checkAuth() {}

  @UseGuards(JwtAuthenticationGuard)
  @Get('whoami')
  @ApiResponse({
    status: 200,
    type: Users,
  })
  @ApiUnauthorizedResponse()
  async whoAmI(@Req() request: RequestWithUser) {
    return request.user;
  }
}
