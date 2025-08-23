import { ApiProperty } from '@nestjs/swagger';

export class DailyUpdateWithTeamDto {
  @ApiProperty({ description: 'Daily update ID' })
  id: string;

  @ApiProperty({ description: 'User ID' })
  userId: string;

  @ApiProperty({ description: 'Project ID' })
  projectId: string;

  @ApiProperty({ description: 'Team ID' })
  teamId: string | null;

  @ApiProperty({ description: 'Date of the update' })
  date: Date;

  @ApiProperty({ description: 'Tickets worked on' })
  tickets: string | null;

  @ApiProperty({ description: 'Internal meeting hours' })
  internalMeetingHours: string;

  @ApiProperty({ description: 'External meeting hours' })
  externalMeetingHours: string;

  @ApiProperty({ description: 'Other activities' })
  otherActivities: string | null;

  @ApiProperty({ description: 'Other activity hours' })
  otherActivityHours: string;

  @ApiProperty({ description: 'Total hours' })
  totalHours: string;

  @ApiProperty({ description: 'Notes' })
  notes: string | null;

  @ApiProperty({ description: 'Status of the update' })
  status: string;

  @ApiProperty({ description: 'Submitted at timestamp' })
  submittedAt: Date | null;

  @ApiProperty({ description: 'Approved at timestamp' })
  approvedAt: Date | null;

  @ApiProperty({ description: 'Approved by user ID' })
  approvedBy: string | null;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at timestamp' })
  updatedAt: Date;

  @ApiProperty({ description: 'Team name' })
  teamName: string | null;

  @ApiProperty({ description: 'Team description' })
  teamDescription: string | null;
}
