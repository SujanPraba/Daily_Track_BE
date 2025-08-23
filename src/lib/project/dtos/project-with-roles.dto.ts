import { ApiProperty } from '@nestjs/swagger';

export class ProjectRoleDto {
  @ApiProperty({ example: 'uuid-role-id' })
  id: string;

  @ApiProperty({ example: 'DEVELOPER' })
  name: string;

  @ApiProperty({ example: 'Developer role with basic access' })
  description?: string;

  @ApiProperty({ example: 'USER', enum: ['USER', 'MANAGER', 'ADMIN'] })
  level: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}

export class ProjectTeamDto {
  @ApiProperty({ example: 'uuid-team-id' })
  id: string;

  @ApiProperty({ example: 'Frontend Development Team' })
  name: string;

  @ApiProperty({ example: 'Team responsible for frontend development and UI/UX' })
  description?: string;

  @ApiProperty({ example: 'uuid-lead-id' })
  leadId?: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}

export class ProjectWithRolesAndTeamsDto {
  @ApiProperty({ example: 'uuid-project-id' })
  id: string;

  @ApiProperty({ example: 'E-Commerce Platform' })
  name: string;

  @ApiProperty({ example: 'Modern e-commerce platform with microservices architecture' })
  description?: string;

  @ApiProperty({ example: 'ECOM-2024' })
  code: string;

  @ApiProperty({ example: 'uuid-manager-id' })
  managerId?: string;

  @ApiProperty({ example: 'ACTIVE', enum: ['ACTIVE', 'INACTIVE', 'COMPLETED', 'ON_HOLD'] })
  status: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  startDate?: Date;

  @ApiProperty({ example: '2024-12-31T00:00:00.000Z' })
  endDate?: Date;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;

  @ApiProperty({ 
    description: 'Array of roles associated with this project',
    type: [ProjectRoleDto]
  })
  roles: ProjectRoleDto[];

  @ApiProperty({ 
    description: 'Array of teams associated with this project',
    type: [ProjectTeamDto]
  })
  teams: ProjectTeamDto[];
}
