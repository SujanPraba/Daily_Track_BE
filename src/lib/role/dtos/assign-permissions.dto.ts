import { IsArray, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignPermissionsDto {
  @ApiProperty({ 
    example: ['uuid1', 'uuid2', 'uuid3'],
    description: 'Array of permission IDs to assign to the role' 
  })
  @IsArray()
  @IsUUID('4', { each: true })
  permissionIds: string[];
}