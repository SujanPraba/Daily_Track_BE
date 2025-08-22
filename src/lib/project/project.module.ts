import { Module } from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controllers/project.controller';
import { ProjectRepository } from './repositories/project.repository';

@Module({
  providers: [ProjectService, ProjectRepository],
  controllers: [ProjectController],
  exports: [ProjectService, ProjectRepository],
})
export class ProjectModule {}