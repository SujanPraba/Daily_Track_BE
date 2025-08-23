import { applyDecorators } from '@nestjs/common';
import { IsOptional, IsUUID, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export function OptionalUUID(example: string, description?: string) {
  return applyDecorators(
    ApiProperty({
      example,
      description: description || 'Optional UUID field',
      required: false,
    }),
    IsOptional(),
    Transform(({ value }) => value === '' ? undefined : value),
    ValidateIf((o) => o !== undefined && o !== null && o !== ''),
    IsUUID()
  );
}
