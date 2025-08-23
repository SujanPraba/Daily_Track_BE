import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateModuleDto } from './create-module.dto';
import { CreateModulePermissionDto } from './module-permission.dto';

export class UpdateModuleDto extends PartialType(CreateModuleDto) {
  @ApiProperty({ 
    description: 'List of permissions to update for this module',
    type: [CreateModulePermissionDto],
    required: false
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateModulePermissionDto)
  permissions?: CreateModulePermissionDto[];
}
