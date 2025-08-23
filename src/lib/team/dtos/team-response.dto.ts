import { ApiProperty } from '@nestjs/swagger';

export class TeamResponseDto {
  @ApiProperty({ example: 'uuid-team-id' })
  id: string;

  @ApiProperty({ example: 'Frontend Development Team' })
  name: string;

  @ApiProperty({ example: 'Team responsible for frontend development and UI/UX' })
  description?: string;

  @ApiProperty({ example: 'uuid-project-id' })
  projectId: string;

  @ApiProperty({ example: 'E-Commerce Platform' })
  projectName: string;

  @ApiProperty({ example: 'uuid-lead-id' })
  leadId?: string;

  @ApiProperty({ example: 'John Doe', description: 'Name of the team lead' })
  leadName?: string;

  @ApiProperty({ example: 5, description: 'Number of users mapped to this team' })
  userCount: number;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
