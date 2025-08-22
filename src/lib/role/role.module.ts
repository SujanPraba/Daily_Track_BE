import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { RoleRepository } from './repositories/role.repository';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [PermissionModule],
  providers: [RoleService, RoleRepository],
  controllers: [RoleController],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}