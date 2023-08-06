import {
  Delete,
  Param,
  Post,
  Patch,
  Controller,
  UsePipes,
  Body,
  Get,
} from '@nestjs/common';
import { Notes } from '@self-notes-frontend/database';
import { NotesService } from '../services';
import { ExistValidationPipe } from '../pipes/exist-validation.pipe';
import { CreateNoteDto, UpdateNoteDto } from '../dto';
import { ResourceCntroller } from '../types';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('notes')
export class NotesController implements ResourceCntroller<Notes> {
  constructor(public service: NotesService) {}

  @Get()
  public findAll(@Paginate() query: PaginateQuery) {
    return this.service.find(query);
  }

  @Post()
  public async create(@Body() body: CreateNoteDto) {
    return this.service.create(body);
  }

  @Patch(':id')
  @UsePipes(ExistValidationPipe(Notes))
  public async update(@Param('id') id: string, @Body() body: UpdateNoteDto) {
    return this.service.update(body);
  }

  @Delete(':id')
  @UsePipes(ExistValidationPipe(Notes))
  async deleteOne(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
