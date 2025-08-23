import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  // roleIds field is inherited from CreateProjectDto
  // This allows updating both project data and role assignments in one request
}