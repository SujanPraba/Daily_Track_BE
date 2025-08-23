import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OptionalUUID } from '../../common/decorators/optional-uuid.decorator';

export class CreateTeamDto {
  @ApiProperty({ example: 'Frontend Development Team' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Team responsible for frontend development and UI/UX' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'uuid-project-id' })
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @OptionalUUID('uuid-lead-id', 'ID of the team lead (optional)')
  leadId?: string;
}