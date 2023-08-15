import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CaslAbilityFactory } from '../services/casl-ability.factory';
import { Reflector } from '@nestjs/core';
import { API_DECORATOR_ENTITY } from '../../resources/decorators/api';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private caslAbilityFactory: CaslAbilityFactory,
    protected reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;

    const ability = this.caslAbilityFactory.createForUser(request.user);
    const entity = this.reflector.get(API_DECORATOR_ENTITY, context.getClass());

    return ability.can(method, entity);
  }
}
