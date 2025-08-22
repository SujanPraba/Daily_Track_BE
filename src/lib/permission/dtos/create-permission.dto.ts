import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({ example: 'CREATE_USER' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Permission to create new users' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'USER' })
  @IsNotEmpty()
  @IsString()
  module: string;

  @ApiProperty({ example: 'CREATE' })
  @IsNotEmpty()
  @IsString()
  action: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}