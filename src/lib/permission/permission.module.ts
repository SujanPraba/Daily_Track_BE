import { Module } from '@nestjs/common';
import { PermissionService } from './services/permission.service';
import { PermissionController } from './controllers/permission.controller';
import { PermissionRepository } from './repositories/permission.repository';

@Module({
  providers: [PermissionService, PermissionRepository],
  controllers: [PermissionController],
  exports: [PermissionService, PermissionRepository],
})
export class PermissionModule {}