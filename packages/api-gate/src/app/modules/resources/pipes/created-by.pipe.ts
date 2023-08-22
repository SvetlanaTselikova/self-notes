import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Injectable, Inject, Scope, PipeTransform } from '@nestjs/common';
import { Users } from '@self-notes/database';

@Injectable({ scope: Scope.REQUEST })
export class CreatedByPipe implements PipeTransform<any> {
  constructor(@Inject(REQUEST) protected readonly request: Request) {}

  transform(body) {
    const user = this.request?.user;
    body.createdBy = (user as Users)?.id;
    return body;
  }
}
