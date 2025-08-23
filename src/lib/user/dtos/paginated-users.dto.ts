import { ApiProperty } from '@nestjs/swagger';
import { UserWithAssignmentsDto } from './user-with-assignments.dto';

export class PaginatedUsersDto {
  @ApiProperty({ 
    description: 'Array of users with their project, role, and team assignments',
    type: 'array',
    items: { $ref: '#/components/schemas/UserWithAssignmentsDto' }
  })
  data: UserWithAssignmentsDto[];

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
    description: 'Total number of users matching the criteria',
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
