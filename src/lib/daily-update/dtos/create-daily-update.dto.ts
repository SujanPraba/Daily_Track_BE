import { IsNotEmpty, IsUUID, IsOptional, IsArray, IsString, IsDateString, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDailyUpdateDto {
  @ApiProperty({ example: 'uuid-user-id' })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'uuid-project-id' })
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @ApiProperty({ example: 'uuid-team-id' })
  @IsOptional()
  @IsUUID()
  teamId?: string;

  @ApiProperty({ example: '2024-01-15T00:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({ 
    example: ['TICKET-001', 'TICKET-002'], 
    description: 'Array of ticket numbers worked on' 
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tickets?: string[];

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

  @ApiProperty({ example: 'Additional notes about the day' })
  @IsOptional()
  @IsString()
  notes?: string;
}