import { ApiProperty } from '@nestjs/swagger';
import { DailyUpdateWithTeamDto } from './daily-update-with-team.dto';

export class PaginatedDailyUpdatesDto {
  @ApiProperty({ description: 'Array of daily updates with team information' })
  data: DailyUpdateWithTeamDto[];

  @ApiProperty({ description: 'Total number of daily updates' })
  total: number;

  @ApiProperty({ description: 'Current page number' })
  page: number;

  @ApiProperty({ description: 'Number of items per page' })
  limit: number;

  @ApiProperty({ description: 'Total number of pages' })
  totalPages: number;

  @ApiProperty({ description: 'Whether there is a next page' })
  hasNextPage: boolean;

  @ApiProperty({ description: 'Whether there is a previous page' })
  hasPrevPage: boolean;
}
