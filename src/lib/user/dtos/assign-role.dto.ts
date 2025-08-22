import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleDto {
  @ApiProperty({ example: 'uuid-role-id' })
  @IsNotEmpty()
  @IsUUID()
  roleId: string;
}