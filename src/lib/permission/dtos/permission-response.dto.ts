import { ApiProperty } from '@nestjs/swagger';

export class PermissionResponseDto {
  @ApiProperty({ example: 'uuid-permission-id' })
  id: string;

  @ApiProperty({ example: 'View_Dashboard' })
  name: string;

  @ApiProperty({ example: 'Permission to view dashboard' })
  description?: string;

  @ApiProperty({ example: 'uuid-module-id' })
  moduleId: string;

  @ApiProperty({ example: 'Dashboard' })
  moduleName: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
