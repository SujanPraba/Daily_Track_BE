import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../database/schemas/user.schema';

export class UserProjectRoleDto {
  @ApiProperty({ description: 'Project ID' })
  projectId: string;

  @ApiProperty({ description: 'Project name' })
  projectName: string;

  @ApiProperty({ description: 'Role ID' })
  roleId: string;

  @ApiProperty({ description: 'Role name' })
  roleName: string;

  @ApiProperty({ description: 'Team ID', required: false })
  teamId?: string;

  @ApiProperty({ description: 'Team name', required: false })
  teamName?: string;

  @ApiProperty({ description: 'Assignment date' })
  assignedAt: Date;
}

export class UserWithAssignmentsDto {
  @ApiProperty({ description: 'User ID' })
  id: string;

  @ApiProperty({ description: 'First name' })
  firstName: string;

  @ApiProperty({ description: 'Last name' })
  lastName: string;

  @ApiProperty({ description: 'Email address' })
  email: string;

  @ApiProperty({ description: 'Phone number', required: false })
  phone?: string;

  @ApiProperty({ description: 'Department', required: false })
  department?: string;

  @ApiProperty({ description: 'Position', required: false })
  position?: string;

  @ApiProperty({ description: 'Employee ID', required: false })
  employeeId?: string;

  @ApiProperty({ description: 'Active status' })
  isActive: boolean;

  @ApiProperty({ description: 'Last login date', required: false })
  lastLoginAt?: Date;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;

  @ApiProperty({ 
    description: 'User project-role assignments',
    type: [UserProjectRoleDto]
  })
  projectRoles: UserProjectRoleDto[];

  @ApiProperty({ 
    description: 'User team assignments',
    type: 'array',
    items: { type: 'string' }
  })
  teamIds: string[];
}
