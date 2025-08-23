import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectRoleAssignmentDto } from './project-role-assignment.dto';

export class AssignProjectRolesDto {
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
    type: [ProjectRoleAssignmentDto]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectRoleAssignmentDto)
  projectRoleAssignments: ProjectRoleAssignmentDto[];
}
