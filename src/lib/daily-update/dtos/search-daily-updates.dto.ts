import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, IsNumber, Min, IsDateString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchDailyUpdatesDto {
  @ApiProperty({ required: false, description: 'User ID to filter by' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ required: false, description: 'Project ID to filter by' })
  @IsOptional()
  @IsUUID()
  projectId?: string;

  @ApiProperty({ required: false, description: 'Team ID to filter by' })
  @IsOptional()
  @IsUUID()
  teamId?: string;

  @ApiProperty({ required: false, description: 'Status to filter by' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ required: false, description: 'Start date for date range filter' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ required: false, description: 'End date for date range filter' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ required: false, description: 'Search in tickets text (comma-separated values)' })
  @IsOptional()
  @IsString()
  tickets?: string;

  @ApiProperty({ required: false, description: 'Page number for pagination', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false, description: 'Number of items per page', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;
}

export class TimeTrackingDto {
  @ApiProperty({ example: 'uuid-project-id', required: false })
  @IsOptional()
  @IsUUID()
  projectId?: string;

  @ApiProperty({ example: 'uuid-team-id', required: false })
  @IsOptional()
  @IsUUID()
  teamId?: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', required: true })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2024-01-31T23:59:59.999Z', required: true })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @ApiProperty({ 
    example: 'day', 
    description: 'Filter time by: "day" for individual days, "fullTime" for total sum',
    enum: ['day', 'fullTime'],
    required: true 
  })
  @IsNotEmpty()
  @IsString()
  filterTimeBy: 'day' | 'fullTime';
}

export class TimeTrackingResponseDto {
  @ApiProperty({ example: 'uuid-user-id' })
  userId: string;

  @ApiProperty({ example: 'John Doe' })
  userName: string;

  @ApiProperty({ example: 'uuid-project-id' })
  projectId: string;

  @ApiProperty({ example: 'Project Name' })
  projectName: string;

  @ApiProperty({ example: 'uuid-team-id', required: false })
  teamId?: string;

  @ApiProperty({ example: 'Team Name', required: false })
  teamName?: string;

  @ApiProperty({ example: '2024-01-15' })
  date: string;

  @ApiProperty({ example: '3.50' })
  internalMeetingHours: string;

  @ApiProperty({ example: '1.00' })
  externalMeetingHours: string;

  @ApiProperty({ example: '1.50' })
  otherActivityHours: string;

  @ApiProperty({ example: '2.00' })
  ticketsHours: string;

  @ApiProperty({ example: '0.50' })
  leavePermissionHours: string;

  @ApiProperty({ example: '8.50' })
  totalHours: string;
}

export class TimeTrackingSummaryResponseDto {
  @ApiProperty({ example: 'uuid-user-id' })
  userId: string;

  @ApiProperty({ example: 'John Doe' })
  userName: string;

  @ApiProperty({ example: 'uuid-project-id' })
  projectId: string;

  @ApiProperty({ example: 'Project Name' })
  projectName: string;

  @ApiProperty({ example: 'uuid-team-id', required: false })
  teamId?: string;

  @ApiProperty({ example: 'Team Name', required: false })
  teamName?: string;

  @ApiProperty({ example: '45.50' })
  totalInternalMeetingHours: string;

  @ApiProperty({ example: '12.00' })
  totalExternalMeetingHours: string;

  @ApiProperty({ example: '18.50' })
  totalOtherActivityHours: string;

  @ApiProperty({ example: '32.00' })
  totalTicketsHours: string;

  @ApiProperty({ example: '8.00' })
  totalLeavePermissionHours: string;

  @ApiProperty({ example: '116.00' })
  grandTotalHours: string;
}
