import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, IsNumber, Min, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchDailyUpdatesDto {
  @ApiProperty({ required: false, description: 'User ID to filter by' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ required: false, description: 'Project ID to filter by' })
  @IsOptional()
  @IsUUID()
  projectId?: string;

  @ApiProperty({ required: false, description: 'Team ID to filter by' })
  @IsOptional()
  @IsUUID()
  teamId?: string;

  @ApiProperty({ required: false, description: 'Status to filter by' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ required: false, description: 'Start date for date range filter' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ required: false, description: 'End date for date range filter' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ required: false, description: 'Search in tickets text (comma-separated values)' })
  @IsOptional()
  @IsString()
  tickets?: string;

  @ApiProperty({ required: false, description: 'Page number for pagination', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false, description: 'Number of items per page', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;
}
