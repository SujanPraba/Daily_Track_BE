import { ApiProperty } from '@nestjs/swagger';

export class ProjectRoleResponseDto {
  @ApiProperty({ example: 'uuid-role-id' })
  id: string;

  @ApiProperty({ example: 'DEVELOPER' })
  name: string;

  @ApiProperty({ example: 'Developer role with basic access' })
  description?: string;

  @ApiProperty({ example: 'USER', enum: ['USER', 'MANAGER', 'ADMIN'] })
  level: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
