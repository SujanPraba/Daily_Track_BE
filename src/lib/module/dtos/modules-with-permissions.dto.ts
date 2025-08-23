import { ApiProperty } from '@nestjs/swagger';

export class PermissionWithModuleDto {
  @ApiProperty({ description: 'Permission ID' })
  id: string;

  @ApiProperty({ description: 'Permission name' })
  name: string;

  @ApiProperty({ description: 'Permission description', required: false })
  description?: string;

  @ApiProperty({ description: 'Whether the permission is active' })
  isActive: boolean;

  @ApiProperty({ description: 'Permission creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Permission last update date' })
  updatedAt: Date;
}

export class ModuleWithPermissionsDto {
  @ApiProperty({ description: 'Module ID' })
  id: string;

  @ApiProperty({ description: 'Module name' })
  name: string;

  @ApiProperty({ description: 'Module description', required: false })
  description?: string;

  @ApiProperty({ description: 'Module code' })
  code: string;

  @ApiProperty({ description: 'Whether the module is active' })
  isActive: boolean;

  @ApiProperty({ description: 'Module creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Module last update date' })
  updatedAt: Date;

  @ApiProperty({ 
    description: 'List of active permissions for this module',
    type: [PermissionWithModuleDto]
  })
  permissions: PermissionWithModuleDto[];
}
