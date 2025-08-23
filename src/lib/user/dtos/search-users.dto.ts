import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchUsersDto {
  @ApiProperty({ 
    description: 'Search term for first name, last name, or email (case-insensitive)',
    required: false,
    example: 'john doe'
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
    description: 'Department filter',
    required: false,
    example: 'Engineering'
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({ 
    description: 'Position filter',
    required: false,
    example: 'Developer'
  })
  @IsOptional()
  @IsString()
  position?: string;
}
