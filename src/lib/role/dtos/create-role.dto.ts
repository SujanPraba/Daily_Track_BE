import { IsNotEmpty, IsString, IsOptional, IsIn, IsBoolean } from 'class-validator';
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
}