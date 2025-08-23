import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchTeamsDto {
  @ApiProperty({ 
    description: 'Search term for team name (case-insensitive)',
    required: false,
    example: 'development'
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
    description: 'Project ID filter',
    required: false,
    example: 'uuid-string'
  })
  @IsOptional()
  @IsString()
  projectId?: string;

  @ApiProperty({ 
    description: 'Lead ID filter',
    required: false,
    example: 'uuid-string'
  })
  @IsOptional()
  @IsString()
  leadId?: string;
}
