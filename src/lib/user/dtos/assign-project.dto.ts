import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignProjectDto {
  @ApiProperty({ example: 'uuid-project-id' })
  @IsNotEmpty()
  @IsUUID()
  projectId: string;
}