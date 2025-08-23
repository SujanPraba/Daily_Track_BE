import { IsNotEmpty, IsString, IsEmail, IsOptional, MinLength, IsUUID, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectRoleAssignmentDto } from './project-role-assignment.dto';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '+1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Engineering' })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({ example: 'Software Developer' })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({ example: 'EMP001' })
  @IsOptional()
  @IsString()
  employeeId?: string;

  @ApiProperty({ 
    example: 'uuid-team-id',
    description: 'ID of the team to assign the user to (optional)',
    required: false
  })
  @IsOptional()
  @IsUUID('4')
  teamId?: string;

  @ApiProperty({ 
    example: [
      {
        "projectId": "2ccfdca6-0daa-4ef5-a7a4-5364011cbbff",
        "roleId": "3ddgdeb7-1ebb-5fg6-b8b5-6475122dcc00"
      },
      {
        "projectId": "4eegfec8-2fcc-6gh7-c9c6-7586233edd11",
        "roleId": "5ffhgfd9-3gdd-7hi8-d0d7-8697344fee22"
      }
    ],
    description: 'Array of project-role assignments for the user',
    type: [ProjectRoleAssignmentDto],
    required: false
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectRoleAssignmentDto)
  projectRoleAssignments?: ProjectRoleAssignmentDto[];
}