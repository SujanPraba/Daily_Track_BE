import { ApiProperty } from '@nestjs/swagger';

export class UserProjectRoleResponseDto {
  @ApiProperty({ 
    description: 'Project information',
    type: 'object'
  })
  project: {
    id: string;
    name: string;
    description?: string;
    code: string;
    status: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

  @ApiProperty({ 
    description: 'Role information',
    type: 'object'
  })
  role: {
    id: string;
    name: string;
    description?: string;
    level: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

  @ApiProperty({ 
    description: 'Team information (optional)',
    type: 'object',
    required: false
  })
  team?: {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

  @ApiProperty({ 
    example: '2024-01-01T00:00:00.000Z',
    description: 'When the project-role assignment was made'
  })
  assignedAt: Date;
}
