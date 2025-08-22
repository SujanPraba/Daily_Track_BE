import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApproveDailyUpdateDto {
  @ApiProperty({ example: 'uuid-approver-id' })
  @IsNotEmpty()
  @IsUUID()
  approverId: string;
}