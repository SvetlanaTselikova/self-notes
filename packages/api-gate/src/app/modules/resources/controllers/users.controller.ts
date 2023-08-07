import { Controller, Get, UseGuards } from '@nestjs/common';
import { Users } from '@self-notes-frontend/database';
import { UsersService } from '../services';
import { ResourceCntroller } from '../types';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { Api } from '../decorators/api';
import { JwtAuthenticationGuard } from '../../authentication/guards';

@Api(Users)
@Controller('Users')
@UseGuards(JwtAuthenticationGuard)
export class UsersController implements ResourceCntroller<Users> {
  constructor(public service: UsersService) {}

  @Get()
  public findAll(@Paginate() query: PaginateQuery) {
    return this.service.find(query);
  }
}
