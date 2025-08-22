import { Module } from '@nestjs/common';
import { TeamService } from './services/team.service';
import { TeamController } from './controllers/team.controller';
import { TeamRepository } from './repositories/team.repository';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [ProjectModule],
  providers: [TeamService, TeamRepository],
  controllers: [TeamController],
  exports: [TeamService, TeamRepository],
})
export class TeamModule {}