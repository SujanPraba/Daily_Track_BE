import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto {
  @ApiProperty({ description: 'Permission ID' })
  id: string;

  @ApiProperty({ description: 'Permission name' })
  name: string;

  @ApiProperty({ description: 'Permission description' })
  description?: string;

  @ApiProperty({ description: 'Module ID this permission belongs to' })
  moduleId: string;

  @ApiProperty({ description: 'Module name' })
  moduleName: string;

  @ApiProperty({ description: 'Module code' })
  moduleCode: string;

  @ApiProperty({ description: 'Whether the permission is active' })
  isActive: boolean;

  @ApiProperty({ description: 'Permission creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Permission last update date' })
  updatedAt: Date;
}

export class RoleWithPermissionsDto {
  @ApiProperty({ description: 'Role ID' })
  id: string;

  @ApiProperty({ description: 'Role name' })
  name: string;

  @ApiProperty({ description: 'Role description' })
  description?: string;

  @ApiProperty({ description: 'Role level (USER, MANAGER, ADMIN)' })
  level: string;

  @ApiProperty({ description: 'Whether the role is active' })
  isActive: boolean;

  @ApiProperty({ description: 'Role creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Role last update date' })
  updatedAt: Date;

  @ApiProperty({ 
    description: 'Array of permissions assigned to this role',
    type: [PermissionDto]
  })
  permissions: PermissionDto[];
}

export class UserDto {
  @ApiProperty({ description: 'User ID' })
  id: string;

  @ApiProperty({ description: 'User first name' })
  firstName: string;

  @ApiProperty({ description: 'User last name' })
  lastName: string;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User department' })
  department?: string;

  @ApiProperty({ description: 'User position' })
  position?: string;

  @ApiProperty({ description: 'User employee ID' })
  employeeId?: string;

  @ApiProperty({ description: 'Whether the user is active' })
  isActive: boolean;

  @ApiProperty({ description: 'User creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'User last update date' })
  updatedAt: Date;
}

export class TeamDto {
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

  @ApiProperty({ 
    description: 'Users assigned to this team',
    type: [UserDto]
  })
  users: UserDto[];
}

export class ProjectWithPermissionsDto {
  @ApiProperty({ description: 'Project ID' })
  id: string;

  @ApiProperty({ description: 'Project name' })
  name: string;

  @ApiProperty({ description: 'Project description' })
  description?: string;

  @ApiProperty({ description: 'Project code' })
  code: string;

  @ApiProperty({ description: 'Project manager ID' })
  managerId?: string;

  @ApiProperty({ description: 'Project status' })
  status: string;

  @ApiProperty({ description: 'Project start date' })
  startDate?: Date;

  @ApiProperty({ description: 'Project end date' })
  endDate?: Date;

  @ApiProperty({ description: 'Whether the project is active' })
  isActive: boolean;

  @ApiProperty({ description: 'Project creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Project last update date' })
  updatedAt: Date;

  @ApiProperty({ 
    description: 'Array of roles associated with this project, including their permissions',
    type: [RoleWithPermissionsDto]
  })
  roles: RoleWithPermissionsDto[];

  @ApiProperty({ 
    description: 'Array of teams associated with this project',
    type: [TeamDto]
  })
  teams: TeamDto[];
}
