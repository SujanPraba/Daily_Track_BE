import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../database/schemas/role.schema';

export class PaginatedRolesDto {
  @ApiProperty({ 
    description: 'Array of roles',
    type: 'array',
    items: { $ref: '#/components/schemas/Role' }
  })
  data: Role[];

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
    description: 'Total number of roles matching the criteria',
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
