import { ApiProperty } from '@nestjs/swagger';
import { ModulePermissionDto } from './module-permission.dto';

export class ModuleResponseDto {
  @ApiProperty({ 
    description: 'Module ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({ 
    description: 'Module name',
    example: 'User Management'
  })
  name: string;

  @ApiProperty({ 
    description: 'Module description',
    example: 'Module for managing users, roles, and permissions',
    required: false
  })
  description?: string;

  @ApiProperty({ 
    description: 'Module code (unique identifier)',
    example: 'USER_MGMT'
  })
  code: string;

  @ApiProperty({ 
    description: 'Whether the module is active',
    example: true
  })
  isActive: boolean;

  @ApiProperty({ 
    description: 'Module creation date',
    example: '2024-01-01T00:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({ 
    description: 'Module last update date',
    example: '2024-01-01T00:00:00.000Z'
  })
  updatedAt: Date;

  @ApiProperty({ 
    description: 'List of permissions associated with this module',
    type: [ModulePermissionDto]
  })
  permissions: ModulePermissionDto[];
}
