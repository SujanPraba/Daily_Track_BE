import { IsNotEmpty, IsUUID, IsOptional, IsString, IsDateString, IsBoolean, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OptionalUUID } from '../../common/decorators/optional-uuid.decorator';

export class ZohoLogTimeEntry {
  @ApiProperty({ example: 'TICKET-001', description: 'Zoho ticket/issue ID' })
  @IsNotEmpty()
  @IsString()
  ticketId: string;

  @ApiProperty({ example: 'Development', description: 'Activity type in Zoho' })
  @IsNotEmpty()
  @IsString()
  activityType: string;

  @ApiProperty({ example: 4.5, description: 'Hours spent on this ticket' })
  @IsNotEmpty()
  @IsNumber()
  hours: number;

  @ApiProperty({ example: 'Implemented user authentication feature', description: 'Description of work done' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2024-01-15', description: 'Date for this log entry' })
  @IsNotEmpty()
  @IsDateString()
  logDate: string;
}

export class ZohoSyncDailyUpdateDto {
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

  // Zoho People specific fields
  @ApiProperty({
    example: true,
    description: 'Whether to sync this update to Zoho People'
  })
  @IsOptional()
  @IsBoolean()
  syncToZoho?: boolean;

  @ApiProperty({
    example: 'ZOHO-USER-123',
    description: 'Zoho People user ID for sync'
  })
  @IsOptional()
  @IsString()
  zohoUserId?: string;

  @ApiProperty({
    example: 'ZOHO-PROJECT-456',
    description: 'Zoho People project ID for sync'
  })
  @IsOptional()
  @IsString()
  zohoProjectId?: string;

  @ApiProperty({
    type: [ZohoLogTimeEntry],
    description: 'Detailed log time entries for Zoho sync'
  })
  @IsOptional()
  @IsArray()
  zohoLogTimeEntries?: ZohoLogTimeEntry[];

  @ApiProperty({
    example: false,
    description: 'Whether to create as draft in Zoho (not submitted)'
  })
  @IsOptional()
  @IsBoolean()
  zohoDraft?: boolean;
}

export class ZohoSyncResponseDto {
  @ApiProperty({ example: 'uuid-daily-update-id' })
  id: string;

  @ApiProperty({ example: 'Daily update created and synced successfully' })
  message: string;

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: string;

  @ApiProperty({
    example: { synced: true, zohoEntries: 3, errors: [] },
    description: 'Zoho sync details'
  })
  zohoSyncDetails?: {
    synced: boolean;
    zohoEntries: number;
    errors: string[];
    zohoResponse?: any;
  };
}
