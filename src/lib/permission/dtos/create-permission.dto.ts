import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({ example: 'View_Dashboard' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Permission to view dashboard' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ 
    example: 'a120f6d9-c200-4f0a-afaa-c617340063e2',
    description: 'ID of the module this permission belongs to'
  })
  @IsNotEmpty()
  @IsUUID()
  moduleId: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}