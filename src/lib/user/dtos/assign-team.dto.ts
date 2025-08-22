import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignTeamDto {
  @ApiProperty({ example: 'uuid-team-id' })
  @IsNotEmpty()
  @IsUUID()
  teamId: string;
}