import { ApiProperty } from '@nestjs/swagger';
import { TeamResponseDto } from './team-response.dto';

export class PaginatedTeamsDto {
  @ApiProperty({ type: [TeamResponseDto] })
  data: TeamResponseDto[];

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 25 })
  total: number;

  @ApiProperty({ example: 3 })
  totalPages: number;

  @ApiProperty({ example: true })
  hasNextPage: boolean;

  @ApiProperty({ example: false })
  hasPrevPage: boolean;
}
