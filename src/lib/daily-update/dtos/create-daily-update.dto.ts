import { IsNotEmpty, IsUUID, IsOptional, IsArray, IsString, IsDateString, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OptionalUUID } from '../../common/decorators/optional-uuid.decorator';

export class CreateDailyUpdateDto {
  @ApiProperty({ example: 'uuid-user-id' })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'uuid-project-id' })
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @OptionalUUID('uuid-team-id', 'ID of the team (optional)')
  teamId?: string;

  @ApiProperty({ example: '2024-01-15T00:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({ 
    example: 'TICKET-001, TICKET-002', 
    description: 'Comma-separated ticket numbers worked on' 
  })
  @IsOptional()
  @IsString()
  tickets?: string;

  @ApiProperty({ example: '3.50', description: 'Hours spent on tickets' })
  @IsOptional()
  @IsString()
  ticketsHours?: string;

  @ApiProperty({ example: '2.50' })
  @IsOptional()
  @IsString()
  internalMeetingHours?: string;

  @ApiProperty({ example: '1.00' })
  @IsOptional()
  @IsString()
  externalMeetingHours?: string;

  @ApiProperty({ example: 'Code review, documentation' })
  @IsOptional()
  @IsString()
  otherActivities?: string;

  @ApiProperty({ example: '1.50' })
  @IsOptional()
  @IsString()
  otherActivityHours?: string;

  @ApiProperty({ example: '2.00', description: 'Hours for leave or permission' })
  @IsOptional()
  @IsString()
  leavePermissionHours?: string;

  @ApiProperty({ example: 'Additional notes about the day' })
  @IsOptional()
  @IsString()
  notes?: string;
}