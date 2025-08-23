import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, Max, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class SearchRolesDto {
  @ApiProperty({ 
    description: 'Search term for role name or level (case-insensitive)',
    required: false,
    example: 'admin'
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
    description: 'Filter by role level',
    required: false,
    example: 'ADMIN'
  })
  @IsOptional()
  @IsString()
  level?: string;

  @ApiProperty({ 
    description: 'Filter by active status',
    required: false,
    example: true
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' ? true : value === 'false' ? false : undefined)
  @IsBoolean()
  isActive?: boolean;
}
