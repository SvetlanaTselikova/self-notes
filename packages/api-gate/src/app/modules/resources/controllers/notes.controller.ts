import {
  Delete,
  Param,
  Post,
  Patch,
  Controller,
  UsePipes,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Notes } from '@self-notes-frontend/database';
import { NotesService } from '../services';
import { ExistValidationPipe } from '../pipes/exist-validation.pipe';
import { CreateNoteDto, UpdateNoteDto } from '../dto';
import { ResourceCntroller } from '../types';
import { Paginate, Paginated } from 'nestjs-paginate';
import { PermissionGuard } from '../../permissions/guards/permission.guard';
import {
  Api,
  ApiOkResponsePaginated,
  PaginateQueryOptions,
  PaginatedResponseDto,
} from '../decorators/api';
import { JwtAuthenticationGuard } from '../../authentication/guards';
import {
  ApiCookieAuth,
  ApiHeader,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export class PaginateQuery {
  page?: number;
  limit?: number;
  sortBy?: [string, string][];
  searchBy?: string[];
  search?: string;
  filter?: {
    [column: string]: string | string[];
  };
  select?: string[];
  path: string;
}

@ApiTags('resources')
@ApiCookieAuth()
@Api(Notes)
@Controller('notes')
@UseGuards(JwtAuthenticationGuard)
@UseGuards(PermissionGuard)
export class NotesController implements ResourceCntroller<Notes> {
  constructor(public service: NotesService) {}

  @Get()
  @ApiOkResponsePaginated(Notes)
  @PaginateQueryOptions()
  @ApiUnauthorizedResponse()
  public findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Notes>> {
    return this.service.find(query);
  }

  @Post()
  @ApiResponse({
    status: 200,
    type: Notes,
  })
  @ApiUnauthorizedResponse()
  public async create(@Body() body: CreateNoteDto) {
    return this.service.create(body);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    type: Notes,
  })
  @ApiUnauthorizedResponse()
  @UsePipes(ExistValidationPipe(Notes))
  public async update(@Param('id') id: string, @Body() body: UpdateNoteDto) {
    return this.service.update(body);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
  })
  @ApiUnauthorizedResponse()
  @UsePipes(ExistValidationPipe(Notes))
  async deleteOne(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
