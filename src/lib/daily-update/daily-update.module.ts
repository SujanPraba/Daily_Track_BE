import { Module } from '@nestjs/common';
import { DailyUpdateService } from './services/daily-update.service';
import { DailyUpdateController } from './controllers/daily-update.controller';
import { DailyUpdateRepository } from './repositories/daily-update.repository';
import { ZohoPeopleService } from './services/zoho-people.service';
import { UserModule } from '../user/user.module';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [UserModule, ProjectModule],
  providers: [DailyUpdateService, DailyUpdateRepository, ZohoPeopleService],
  controllers: [DailyUpdateController],
  exports: [DailyUpdateService, DailyUpdateRepository, ZohoPeopleService],
})
export class DailyUpdateModule {}