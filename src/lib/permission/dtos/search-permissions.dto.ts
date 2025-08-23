import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, Max, IsBoolean, IsUUID } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class SearchPermissionsDto {
  @ApiProperty({ 
    description: 'Search term for permission name or module name (case-insensitive)',
    required: false,
    example: 'view dashboard'
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
    description: 'Filter by module ID',
    required: false,
    example: 'a120f6d9-c200-4f0a-afaa-c617340063e2'
  })
  @IsOptional()
  @IsUUID()
  moduleId?: string;

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
