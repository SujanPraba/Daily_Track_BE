import { ApiProperty } from '@nestjs/swagger';

export class UserTeamDto {
  @ApiProperty({ description: 'Team ID' })
  id: string;

  @ApiProperty({ description: 'Team name' })
  name: string;

  @ApiProperty({ description: 'Team description' })
  description?: string;

  @ApiProperty({ description: 'Team lead ID' })
  leadId?: string;

  @ApiProperty({ description: 'Whether the team is active' })
  isActive: boolean;

  @ApiProperty({ description: 'Team creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Team last update date' })
  updatedAt: Date;
}

export class UserRoleDto {
  @ApiProperty({ description: 'Role ID' })
  id: string;

  @ApiProperty({ description: 'Role name' })
  name: string;

  @ApiProperty({ description: 'Role description' })
  description?: string;

  @ApiProperty({ description: 'Role level' })
  level: string;

  @ApiProperty({ description: 'Whether the role is active' })
  isActive: boolean;

  @ApiProperty({ description: 'Role creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Role last update date' })
  updatedAt: Date;

  @ApiProperty({ 
    description: 'Array of active permission names assigned to this role',
    type: 'array',
    items: { type: 'string' }
  })
  permissions: string[];
}

export class UserProjectDto {
  @ApiProperty({ description: 'Project ID' })
  id: string;

  @ApiProperty({ description: 'Project name' })
  name: string;

  @ApiProperty({ description: 'Project description' })
  description?: string;

  @ApiProperty({ description: 'Project code' })
  code: string;

  @ApiProperty({ description: 'Project status' })
  status: string;

  @ApiProperty({ description: 'Whether the project is active' })
  isActive: boolean;

  @ApiProperty({ description: 'Project creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Project last update date' })
  updatedAt: Date;

  @ApiProperty({ 
    description: 'Array of teams in this project',
    type: [UserTeamDto]
  })
  teams: UserTeamDto[];

  @ApiProperty({ 
    description: 'Array of roles in this project with Daily Updates permissions only',
    type: [UserRoleDto]
  })
  roles: UserRoleDto[];
}

export class UserAllInformationDto {
  @ApiProperty({ description: 'User ID' })
  id: string;

  @ApiProperty({ description: 'User first name' })
  firstName: string;

  @ApiProperty({ description: 'User last name' })
  lastName: string;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User phone number' })
  phone?: string;

  @ApiProperty({ description: 'User department' })
  department?: string;

  @ApiProperty({ description: 'User position' })
  position?: string;

  @ApiProperty({ description: 'User employee ID' })
  employeeId?: string;

  @ApiProperty({ description: 'Whether the user is active' })
  isActive: boolean;

  @ApiProperty({ description: 'User last login date' })
  lastLoginAt?: Date;

  @ApiProperty({ description: 'User creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'User last update date' })
  updatedAt: Date;

  @ApiProperty({ 
    description: 'Array of active projects the user is assigned to with teams and Daily Updates roles',
    type: [UserProjectDto]
  })
  projects: UserProjectDto[];

  @ApiProperty({ 
    description: 'Array of common permissions (non-Daily Updates) the user has',
    type: 'array',
    items: { type: 'string' }
  })
  commonPermissions: string[];
}
