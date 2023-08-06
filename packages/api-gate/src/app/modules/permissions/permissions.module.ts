import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './services/casl-ability.factory';
import { PermissionGuard } from './guards/permission.guard';

@Module({
  providers: [CaslAbilityFactory, PermissionGuard],
  exports: [CaslAbilityFactory, PermissionGuard],
})
export class PermissionsModule {}
