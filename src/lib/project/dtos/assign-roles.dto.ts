import { IsArray, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRolesDto {
  @ApiProperty({ 
    example: ['2ccfdca6-0daa-4ef5-a7a4-5364011cbbff', '3ddgdeb7-1ebb-5fg6-b8b5-6475122dcc00'],
    description: 'Array of role IDs to assign to the project' 
  })
  @IsArray()
  @IsUUID('4', { each: true })
  roleIds: string[];
}
