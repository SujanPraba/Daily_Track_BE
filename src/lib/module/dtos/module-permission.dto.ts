import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class ModulePermissionDto {
  @ApiProperty({ 
    description: 'Permission ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  id: string;

  @ApiProperty({ 
    description: 'Permission name',
    example: 'CREATE_USER'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    description: 'Permission description',
    example: 'Create new users',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ 
    description: 'Whether this permission is active',
    example: true
  })
  @IsBoolean()
  isActive: boolean;
}

export class CreateModulePermissionDto {
  @ApiProperty({ 
    description: 'Permission name',
    example: 'CREATE_USER'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    description: 'Permission description',
    example: 'Create new users',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ 
    description: 'Whether this permission is active',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
