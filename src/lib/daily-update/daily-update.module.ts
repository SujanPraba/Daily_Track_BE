import { Module } from '@nestjs/common';
import { DailyUpdateService } from './services/daily-update.service';
import { DailyUpdateController } from './controllers/daily-update.controller';
import { DailyUpdateRepository } from './repositories/daily-update.repository';
import { UserModule } from '../user/user.module';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [UserModule, ProjectModule],
  providers: [DailyUpdateService, DailyUpdateRepository],
  controllers: [DailyUpdateController],
  exports: [DailyUpdateService, DailyUpdateRepository],
})
export class DailyUpdateModule {}