import { IsNotEmpty, IsString, IsOptional, IsUUID, IsDateString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'E-Commerce Platform' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Modern e-commerce platform with microservices architecture' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'ECOM-2024' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: 'uuid-manager-id' })
  @IsOptional()
  @IsUUID()
  managerId?: string;

  @ApiProperty({ example: 'ACTIVE', enum: ['ACTIVE', 'INACTIVE', 'COMPLETED', 'ON_HOLD'] })
  @IsOptional()
  @IsString()
  @IsIn(['ACTIVE', 'INACTIVE', 'COMPLETED', 'ON_HOLD'])
  status?: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ example: '2024-12-31T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}