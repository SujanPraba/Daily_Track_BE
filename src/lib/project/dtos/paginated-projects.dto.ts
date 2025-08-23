import { ApiProperty } from '@nestjs/swagger';
import { ProjectWithRolesAndTeamsDto } from './project-with-roles.dto';

export class PaginatedProjectsDto {
  @ApiProperty({
    description: 'Array of projects with their associated roles and teams',
    type: 'array',
    items: { $ref: '#/components/schemas/ProjectWithRolesAndTeamsDto' }
  })
  data: ProjectWithRolesAndTeamsDto[];

  @ApiProperty({
    description: 'Current page number',
    example: 1
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of projects matching the criteria',
    example: 25
  })
  total: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 3
  })
  totalPages: number;

  @ApiProperty({
    description: 'Whether there is a next page',
    example: true
  })
  hasNextPage: boolean;

  @ApiProperty({
    description: 'Whether there is a previous page',
    example: false
  })
  hasPrevPage: boolean;
}
