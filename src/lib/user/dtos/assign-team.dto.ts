import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignTeamDto {
  @ApiProperty({ 
    example: '2ccfdca6-0daa-4ef5-a7a4-5364011cbbff',
    description: 'ID of the team to assign to the user' 
  })
  @IsNotEmpty()
  @IsUUID('4')
  teamId: string;
}