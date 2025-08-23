import { IsNotEmpty, IsString, IsOptional, IsDateString, IsIn, IsArray, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OptionalUUID } from '../../common/decorators/optional-uuid.decorator';

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

  @OptionalUUID('uuid-manager-id', 'ID of the project manager (optional)')
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

  @ApiProperty({ 
    example: ['2ccfdca6-0daa-4ef5-a7a4-5364011cbbff', '3ddgdeb7-1ebb-5fg6-b8b5-6475122dcc00'],
    description: 'Array of role IDs to assign to this project',
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  roleIds?: string[];
}