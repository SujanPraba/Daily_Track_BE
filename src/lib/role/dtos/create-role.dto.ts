import { IsNotEmpty, IsString, IsOptional, IsIn, IsBoolean, IsArray, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Administrator role with full access' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'ADMIN', enum: ['USER', 'MANAGER', 'ADMIN'] })
  @IsOptional()
  @IsString()
  @IsIn(['USER', 'MANAGER', 'ADMIN'])
  level?: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ 
    example: ['2ccfdca6-0daa-4ef5-a7a4-5364011cbbff'],
    description: 'Array of permission IDs to assign to the role',
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  permissionIds?: string[];
}