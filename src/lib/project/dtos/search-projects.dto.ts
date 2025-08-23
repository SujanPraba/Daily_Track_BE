import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchProjectsDto {
  @ApiProperty({ 
    description: 'Search term for project name (case-insensitive)',
    required: false,
    example: 'web app'
  })
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @ApiProperty({ 
    description: 'Page number (starts from 1)',
    required: false,
    default: 1,
    minimum: 1,
    example: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ 
    description: 'Number of items per page',
    required: false,
    default: 10,
    minimum: 1,
    maximum: 100,
    example: 10
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiProperty({ 
    description: 'Project status filter',
    required: false,
    example: 'ACTIVE'
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ 
    description: 'Manager ID filter',
    required: false,
    example: 'uuid-string'
  })
  @IsOptional()
  @IsString()
  managerId?: string;
}
