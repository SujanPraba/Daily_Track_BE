import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectRoleAssignmentDto {
  @ApiProperty({ 
    example: '2ccfdca6-0daa-4ef5-a7a4-5364011cbbff',
    description: 'ID of the project to assign the user to'
  })
  @IsNotEmpty()
  @IsUUID('4')
  projectId: string;

  @ApiProperty({ 
    example: '3ddgdeb7-1ebb-5fg6-b8b5-6475122dcc00',
    description: 'ID of the role to assign to the user in this project'
  })
  @IsNotEmpty()
  @IsUUID('4')
  roleId: string;

  @ApiProperty({ 
    example: '4eegfec8-2fcc-6gh7-c9c6-7586233edd11',
    description: 'ID of the team the user belongs to for this project (optional)',
    required: false
  })
  @IsOptional()
  @IsUUID('4')
  teamId?: string;
}
